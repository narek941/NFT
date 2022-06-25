pipeline {
  agent {
      any {
      }
  }
  parameters {
    gitParameter branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'BRANCH', type: 'PT_BRANCH_'
  }
  environment {
      ECR_REPO = "576236855336.dkr.ecr.eu-central-1.amazonaws.com/service/wl-frontend"
      AWS_DEFAULT_REGION = "eu-central-1"
      ENV = "${env.ENV}"
  }
  stages {
    stage("Docker Build") {
      steps {
        script {
         commit_hash = sh(script: 'git rev-parse --short=6 HEAD', returnStdout: true).trim()
        }
       container('docker') {
         sh "docker build --network=host -t ${ECR_REPO}:${commit_hash} --build-arg ENV=$ENV ."
       }
    }
    }
    stage("ECR push") {
      steps {
        container('docker') {
              script {
                def login = ecrLogin()
                sh "${login}"
                sh "docker push ${ECR_REPO}:${commit_hash}"
              }
          }
        }
      }
    stage("Clone k8s repo") {
      steps{
        dir('k8s') {}
        git branch: 'master',
            credentialsId: 'niftables-deploy',
            url: 'git@git.testserver.kiev.ua:niftables/k8s-manifests.git'
      }
    }
    stage("Kustomize") {
      steps {
        container('kustomize') {
        dir('k8s') {}
        sh "cd wl-frontend/kustomize/overlays/$ENV && /app/kustomize edit set image service/wl-frontend=${ECR_REPO}:${commit_hash}"
        }
      }
    }
    stage("Push") {
        environment {
          HASH = "$commit_hash"
        }
        steps {
          dir('k8s') {}
          sh('''
              git config user.name 'jenkins'
              git config user.email 'som@unicsoft.com'
              git add wl-frontend/kustomize/overlays/$ENV/kustomization.yaml
              git commit -m "[wl-frontend][$ENV] Deploy revision \$HASH"
          ''')

          sshagent(['niftables-deploy']) {
              sh("""
                  #!/usr/bin/env bash
                  set +x
                  export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
                  git push origin master
               """)
          }
        }
      }
}
}
