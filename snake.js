class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('gameOverlay');
        this.startButton = document.getElementById('startButton');
        this.currentScoreElement = document.getElementById('current-score');
        this.bestScoreElement = document.getElementById('best-score');
        this.overlayTitle = document.getElementById('overlay-title');
        this.overlayMessage = document.getElementById('overlay-message');

        // Configurações do jogo
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        this.gameSpeed = 150;
        this.gameRunning = false;
        this.gamePaused = false;

        // Estado do jogo
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.bestScore = this.loadBestScore();

        // Controles touch
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;

        this.init();
    }

    init() {
        this.updateBestScore();
        this.setupEventListeners();
        this.showStartScreen();
    }

    setupEventListeners() {
        // Controles de teclado
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Controles touch
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);
        this.canvas.addEventListener('touchmove', (e) => e.preventDefault(), false);

        // Botão de início
        this.startButton.addEventListener('click', () => this.startGame());

        // Prevenir scroll em dispositivos móveis
        this.canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    }

    handleKeyPress(e) {
        const key = e.key;
        const currentDx = this.dx;
        const currentDy = this.dy;

        // Se o jogo não está rodando, permitir apenas iniciar com setas
        if (!this.gameRunning) {
            switch (key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.startGame();
                    // Continuar para definir a direção
                    break;
                default:
                    return;
            }
        }

        // Se o jogo está pausado, não processar teclas de movimento
        if (this.gamePaused) {
            if (key === ' ') {
                e.preventDefault();
                this.togglePause();
            }
            return;
        }

        switch (key) {
            case 'ArrowUp':
                if (currentDy !== 1) {
                    this.dx = 0;
                    this.dy = -1;
                }
                break;
            case 'ArrowDown':
                if (currentDy !== -1) {
                    this.dx = 0;
                    this.dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (currentDx !== 1) {
                    this.dx = -1;
                    this.dy = 0;
                }
                break;
            case 'ArrowRight':
                if (currentDx !== -1) {
                    this.dx = 1;
                    this.dy = 0;
                }
                break;
            case ' ':
                e.preventDefault();
                this.togglePause();
                break;
        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    }

    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.gameRunning || this.gamePaused) return;

        const touch = e.changedTouches[0];
        this.touchEndX = touch.clientX;
        this.touchEndY = touch.clientY;

        this.handleSwipe();
    }

    handleSwipe() {
        const diffX = this.touchStartX - this.touchEndX;
        const diffY = this.touchStartY - this.touchEndY;
        const minSwipeDistance = 30;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Swipe horizontal
            if (Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0 && this.dx !== 1) {
                    // Swipe esquerda
                    this.dx = -1;
                    this.dy = 0;
                } else if (diffX < 0 && this.dx !== -1) {
                    // Swipe direita
                    this.dx = 1;
                    this.dy = 0;
                }
            }
        } else {
            // Swipe vertical
            if (Math.abs(diffY) > minSwipeDistance) {
                if (diffY > 0 && this.dy !== 1) {
                    // Swipe cima
                    this.dx = 0;
                    this.dy = -1;
                } else if (diffY < 0 && this.dy !== -1) {
                    // Swipe baixo
                    this.dx = 0;
                    this.dy = 1;
                }
            }
        }
    }

    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.updateScore();
        this.generateFood();
        this.hideOverlay();
        this.gameLoop();
        
        // Desenhar o estado inicial
        this.draw();
    }

    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused) {
            this.gameLoop();
        }
    }

    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;

        setTimeout(() => {
            this.update();
            this.draw();
            this.gameLoop();
        }, this.gameSpeed);
    }

    update() {
        // Se a cobra não está se movendo, não fazer nada
        if (this.dx === 0 && this.dy === 0) {
            return;
        }

        // Mover a cobra
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        // Verificar colisão com bordas
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Verificar colisão com o próprio corpo
        for (let i = 0; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver();
                return;
            }
        }

        this.snake.unshift(head);

        // Verificar se comeu a comida
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.generateFood();
            this.increaseSpeed();
        } else {
            this.snake.pop();
        }
    }

    draw() {
        // Limpar canvas
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Desenhar grade (opcional)
        this.drawGrid();

        // Desenhar cobra
        this.drawSnake();

        // Desenhar comida
        this.drawFood();
    }

    drawGrid() {
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }

    drawSnake() {
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Cabeça da cobra
                this.ctx.fillStyle = '#2ecc71';
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
                
                // Olhos
                this.ctx.fillStyle = '#000';
                const eyeSize = 3;
                const eyeOffset = 4;
                
                // Determinar posição dos olhos baseado na direção
                let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
                
                if (this.dx === 1) { // Direita
                    leftEyeX = segment.x * this.gridSize + this.gridSize - eyeOffset;
                    leftEyeY = segment.y * this.gridSize + eyeOffset;
                    rightEyeX = segment.x * this.gridSize + this.gridSize - eyeOffset;
                    rightEyeY = segment.y * this.gridSize + this.gridSize - eyeOffset;
                } else if (this.dx === -1) { // Esquerda
                    leftEyeX = segment.x * this.gridSize + eyeOffset;
                    leftEyeY = segment.y * this.gridSize + eyeOffset;
                    rightEyeX = segment.x * this.gridSize + eyeOffset;
                    rightEyeY = segment.y * this.gridSize + this.gridSize - eyeOffset;
                } else if (this.dy === -1) { // Cima
                    leftEyeX = segment.x * this.gridSize + eyeOffset;
                    leftEyeY = segment.y * this.gridSize + eyeOffset;
                    rightEyeX = segment.x * this.gridSize + this.gridSize - eyeOffset;
                    rightEyeY = segment.y * this.gridSize + eyeOffset;
                } else if (this.dy === 1) { // Baixo
                    leftEyeX = segment.x * this.gridSize + eyeOffset;
                    leftEyeY = segment.y * this.gridSize + this.gridSize - eyeOffset;
                    rightEyeX = segment.x * this.gridSize + this.gridSize - eyeOffset;
                    rightEyeY = segment.y * this.gridSize + this.gridSize - eyeOffset;
                } else { // Parado
                    leftEyeX = segment.x * this.gridSize + eyeOffset;
                    leftEyeY = segment.y * this.gridSize + eyeOffset;
                    rightEyeX = segment.x * this.gridSize + this.gridSize - eyeOffset;
                    rightEyeY = segment.y * this.gridSize + eyeOffset;
                }
                
                this.ctx.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize);
                this.ctx.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize);
            } else {
                // Corpo da cobra
                const alpha = 1 - (index * 0.1);
                this.ctx.fillStyle = `rgba(46, 204, 113, ${Math.max(0.3, alpha)})`;
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
            }
        });
    }

    drawFood() {
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
        
        // Brilho na comida
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2 - 3,
            this.food.y * this.gridSize + this.gridSize / 2 - 3,
            3,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }

    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        this.food = newFood;
    }

    increaseSpeed() {
        if (this.gameSpeed > 50) {
            this.gameSpeed -= 2;
        }
    }

    updateScore() {
        this.currentScoreElement.textContent = this.score;
        this.currentScoreElement.parentElement.classList.add('updated');
        
        setTimeout(() => {
            this.currentScoreElement.parentElement.classList.remove('updated');
        }, 300);

        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.saveBestScore();
            this.updateBestScore();
        }
    }

    updateBestScore() {
        this.bestScoreElement.textContent = this.bestScore;
    }

    loadBestScore() {
        return parseInt(localStorage.getItem('snakeBestScore')) || 0;
    }

    saveBestScore() {
        localStorage.setItem('snakeBestScore', this.bestScore.toString());
    }

    gameOver() {
        this.gameRunning = false;
        this.showGameOverScreen();
    }

    showStartScreen() {
        this.overlayTitle.textContent = '🐍 Snake Game';
        this.overlayMessage.textContent = 'Clique em "Iniciar Jogo" e depois use as setas do teclado ou gestos para mover a cobra';
        this.startButton.textContent = 'Iniciar Jogo';
        this.showOverlay();
    }

    showGameOverScreen() {
        this.overlayTitle.textContent = 'Game Over!';
        this.overlayMessage.textContent = `Pontuação: ${this.score}`;
        this.startButton.textContent = 'Jogar Novamente';
        this.showOverlay();
    }

    showOverlay() {
        this.overlay.classList.remove('hidden');
    }

    hideOverlay() {
        this.overlay.classList.add('hidden');
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});
