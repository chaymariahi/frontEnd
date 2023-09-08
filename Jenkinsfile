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
    //DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Récupérer le code source depuis le référentiel Git
                git url: 'https://github.com/chaymariahi/frontEnd.git'
            }
        }

        stage('Build docker') {
      steps {
        bat 'docker build -t chymouu/jenkins-docker-hub .'
      }
    }
    stage('Login') {
      steps {
        script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                        bat 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    }

    }
    }
    stage('Push docker') {
      steps {
        bat 'docker push chymouu/jenkins-docker-hub'
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