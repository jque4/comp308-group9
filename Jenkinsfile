pipeline {
    agent any

    stages {
        stage('Check Out') {
            steps {
                // Get code from GitHub repository
                git url: 'https://github.com/jque4/comp308-group9.git', branch: 'main', credentialsId: 'GitHub-Token'
            }
        }
        stage('Build') {
            steps {
                script {
                    env.CI=""
                }
                // Build Dependencies
                bat 'npm ci'

                // Generate Artifacts
                bat 'npx netlify-cli build -o'
            }
        }
        stage('Test') {
            steps {
                withSonarQubeEnv('SonarQube_server') {
                    // Run unit tests
                    bat 'npm test'
                    
                    // SonarQube static code analysis
                    bat 'node sonarqube-scanner.js'
                }
            }
        }
        stage('Deliver') {
            steps {
                // Deploy artifact with steps
                // Deploy to Dev Env
                bat 'npx netlify-cli deploy --dir ./build --site comp308-w2024-project-dev --open'
                // Deploy to QAT Env
                bat 'npx netlify-cli deploy --dir ./build --site comp308-w2024-project-qat'
                // Deploy to Staging Env
                bat 'npx netlify-cli deploy --dir ./build --site comp308-w2024-project-staging'
                // Deploy to Production Env
                bat 'npx netlify-cli deploy --dir ./build --site comp308-w2024-project-production -p'
            }
        }
    }
}
