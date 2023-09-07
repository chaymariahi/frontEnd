pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }

    environment {
    SONARSERVER = "sonarserver"
    SONARSCANNER = "sonarscanner"
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Récupérer le code source depuis le référentiel Git
                git url: 'https://github.com/chaymariahi/frontEnd.git'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                // Build et tag de l'image Docker
                script {
                    docker.build("jenkins/jenkins-docker-hub")
                }

                // Connexion à Docker Hub et pousser l'image
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                    bat 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
                    bat 'docker push jenkins/jenkins-docker-hub'
                }
            }
        }

        stage('Build') {
            steps {
                
                // Installer les dépendances Angular
                bat 'npm install'

                // Build de l'application Angular pour la production
                bat 'npm run build --prod'
            }
        }

       /* stage('Test') {
            steps {
                // Exécution des tests unitaires Angular (optionnel)
                bat 'npm run test-headless'

                // Exécution des tests d'intégration Angular (optionnel)
                //bat 'ng e2e'
            }
        }*/

       /* stage('SonarQube Scan') {

            environment {
             scannerHome = tool "${SONARSCANNER}"
          }
                            steps {
                                withSonarQubeEnv("${SONARSERVER}") {
                                    bat 'npm run sonar'
                                }
                            }
            
             
        }*/


        //stage('Deploy') {
           // steps {
            // Copiez le contenu de dist\* vers le répertoire de destination
           // bat 'xcopy /s /y dist\\* C:\\Apache24\\htdocs\\monapp'
            //}
        //}
    }

    post {
        failure {
            // Actions en cas d'échec du pipeline
            echo 'Le pipeline a echoue. Veuillez verifier les logs et les erreurs.'
        }

        success {
            // Actions en cas de succès du pipeline
            echo 'Le pipeline a reussi !'
        }
    }
}