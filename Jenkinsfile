pipeline{
    agent{
        label 'jenkins-agent1'
    }
environment{
    // node_download_url='https://nodejs.org/download/release/v16.20.0/node-v16.20.0-linux-arm64.tar.gz'
    DB_USRNM='env'
    DB_PSSWD='Shunyaekai@2022'
    DB_URL='main.cue7elc3bjnz.ap-south-1.rds.amazonaws.com'
    DB_SCHEMA='Env'
}
    
stages{
    stage("Cleanup workspace"){
          steps {
            cleanWs()
          }

    }
    stage('checkout'){
        steps{
            git branch: 'main', credentialsId: 'github' url:'https://github.com/shorya1104/envrepo.git'
        }
    }
    // stage('infrastructure'){
    //     steps{
    //         script{
    //             /*python script*/
    //             sh "sudo python3 infra.py"
    //         }
    //     }
    // }
    stage('build and serve'){
        steps{
            dir('client'){
            sh 'ls'
            sh 'npm install --force'
            sh 'npm run build'
            sh 'mv build/ ../server'
            }
        }
    }
    
    stage('prepare db'){
        steps{
            sh '''
                sed -i "s|#dbusername#|$DB_USRNM|g" /u01/jenkins/workspace/envtest/env_ci/server/.env
                sed -i "s|#dbpassword#|$DB_PSSWD|g" /u01/jenkins/workspace/envtest/env_ci/server/.env
                sed -i "s|#dbname#|$DB_SCHEMA|g" /u01/jenkins/workspace/envtest/env_ci/server/.env
                sed -i "s|#dburl#|$DB_URL|g" /u01/jenkins/workspace/envtest/env_ci/server/.env
            '''
        }
    }
    stage('package'){
        steps{
            dir('server'){
            sh '''
                npm install
                npm pack 
                mkdir test
                cp *.tgz test
            '''
            }
        }
    }
    stage("SonarQube Analyst"){
       steps{
             script {
                    withSonarQubeEnv(credentialsId: 'jenkins-sonarqube-token'){
                        sh "mvn sonar:sonar"
                    }
             }
       }
    } 
     stage("Quality Gate"){
        steps{
            script {
                waitForQualityGate abortPipeline: false, credentialsId: 'jenkins-sonarqube-token'
            }
        }
       }
    // stage('push artifact in repo'){
    //     steps{
    //         git branch: 'test', url:'https://github.com/shorya1104/envrepo.git'
    //         sh 'cd ${workspace}/server/test'
    //         sh 'git init'
    //         sh 'git add --all'
    //         sh 'git commit -m "push artfact in repo"'
    //         sh 'git branch -M test'
    //         sh ' git push -u origin test'
    //     }
    // }
  }
}
