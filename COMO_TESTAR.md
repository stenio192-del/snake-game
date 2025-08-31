# 🎮 Como Testar o Snake Game

## ✅ Problema Corrigido!

O bug do "Game Over instantâneo" foi corrigido. Agora o jogo funciona corretamente.

## 🌐 Links para Teste

### Desktop (mesmo computador):
- **http://localhost:8000/snake-game/**

### Mobile (mesma rede Wi-Fi):
- **http://192.168.15.76:8000/snake-game/**

## 🎯 Como Jogar

### Método 1: Botão "Iniciar Jogo"
1. Clique em **"Iniciar Jogo"**
2. Use as **setas do teclado** para mover a cobra
3. A cobra só começa a se mover quando você pressionar uma seta

### Método 2: Teclas Diretas
1. Pressione qualquer **seta do teclado** (↑↓←→)
2. O jogo inicia automaticamente na direção escolhida

## 🎮 Controles

### Desktop:
- **↑** - Mover para cima
- **↓** - Mover para baixo  
- **←** - Mover para esquerda
- **→** - Mover para direita
- **Espaço** - Pausar/Despausar

### Mobile:
- **Arrastar o dedo** na tela para direcionar
- **Toque no botão** para iniciar

## 🐛 O que foi corrigido:

1. **Game Over instantâneo**: A cobra agora só se move quando você pressionar uma tecla
2. **Início do jogo**: Pode iniciar clicando no botão OU pressionando uma seta
3. **Estado inicial**: A cobra fica parada até você escolher uma direção
4. **Mensagem clara**: Instruções mais claras na tela inicial

## ✅ Teste estas funcionalidades:

- [ ] Jogo inicia corretamente
- [ ] Cobra só se move com setas
- [ ] Sistema de pontuação funciona
- [ ] Comida aparece e é coletada
- [ ] Cobra cresce ao comer
- [ ] Colisões funcionam (bordas e próprio corpo)
- [ ] Game Over aparece corretamente
- [ ] Melhor pontuação é salva
- [ ] Responsivo em diferentes tamanhos de tela

## 🔄 Se precisar reiniciar o servidor:

```bash
cd snake-game
python -m http.server 8000
```

**Divirta-se jogando! 🐍🎮**
