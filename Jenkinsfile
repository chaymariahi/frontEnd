pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    

    environment {
    SONARSERVER = "sonarserver"
    SONARSCANNER = "sonarscanner"
    
    }
    
    stages {
        stage('Checkout') {
            steps {
                
                git url: 'https://github.com/chaymariahi/frontEnd.git'
            }
        }

        stage('Build docker') {
      steps {
        bat 'docker build -t chaymariahi/jenkins-docker-hub .'
      }
    }
    stage('Login') {
      steps {
        script {
                    
                    withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    bat "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                }

      }
    }
    }
    stage('Push docker') {
      steps {
        bat 'docker push chaymariahi/jenkins-docker-hub'
      }
    }

        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm run build --prod'
            }
        }

        /*stage('Test') {
            steps {
                
                bat 'npm run test-headless'
                bat 'ng e2e'
            }
        }

        stage('SonarQube Scan') {

            environment {
             scannerHome = tool "${SONARSCANNER}"
          }
                            steps {
                                withSonarQubeEnv("${SONARSERVER}") {
                                    bat 'npm run sonar'
                                }
                            }    
        }*/


        stage('Deploy to docker') {
            steps {
               /*bat 'docker run -p 80:80 -d --name appweb chaymariahi/jenkins-docker-hub'*/
               bat 'docker run -p 80:80 -d chaymariahi/jenkins-docker-hub'
            }
        }

        /*stage('Deploy to Kubernetes') {
            steps {
               bat 'kubectl apply -f deployment.yaml'
            
            }
       }*/
    }

    post {
        failure {
            echo 'Le pipeline a echoue. Veuillez verifier les logs et les erreurs.'
        }

        success {
            echo 'Le pipeline a reussi !'
        }
    }
}