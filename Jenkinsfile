pipeline {
    agent any

    environment {
        APP_ENV = 'local'
        APP_URL = 'http://app:8000'
        DASHBOARD_URL = 'http://127.0.0.1:80'
        DB_CONNECTION = 'mysql'
        DB_HOST = 'database'
        DB_PORT = '3306'
        DB_DATABASE = 'mailing_service'
        DB_USERNAME = 'group3'
        DB_PASSWORD = '87654321'
        MAIL_MAILER = 'smtp'
        MAIL_HOST = 'sandbox.smtp.mailtrap.io'
        MAIL_PORT = '2525'
        MAIL_USERNAME = '411b1cc4d89ccf'
        MAIL_PASSWORD = '3062cdc807ffc5'
        MAIL_ENCRYPTION = ''
        MAIL_FROM_ADDRESS = 'hello@example.com'
        MAIL_FROM_NAME = 'Mailing_Service'
    }

    stages {
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'php:latest'
                }
            }
            steps {
                sh 'php --version'
            }
        }

        stage('Run Docker') {
            agent {
                docker {
                    image 'docker:20.10-dind'
                    args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                script {
                    sh '''
                        docker compose up -d
                        sleep 80
                        docker compose ps
                        docker compose logs app
                    '''
                }
            }
        }

        stage('Run Node Tests') {
            agent {
                docker {
                    image 'node:lts'
                }
            }
            steps {
                script {
                    sh '''
                        # Install Chrome and ChromeDriver for headless testing
                        wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
                        sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

                        apt-get update
                        apt-get install -y google-chrome-stable
                        google-chrome --version

                        # Install node dependencies and run tests
                        npm install
                        npm install selenium-webdriver mocha

                        # Run Mocha Selenium tests
                        npx mocha testcase/test_sendemail_javascript.spec.cjs || { echo "Mocha tests failed"; exit 1; }
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker compose down'
            }
        }
    }
}
