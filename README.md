# 🐍 Snake Game

Um jogo Snake clássico desenvolvido em JavaScript puro com HTML5 Canvas, interface responsiva e controles para desktop e mobile.

## ✨ Características

- **Interface Moderna**: Design minimalista com gradientes e animações suaves
- **Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis
- **Controles Intuitivos**: 
  - Setas do teclado para desktop
  - Gestos de swipe para mobile
- **Sistema de Pontuação**: Pontuação atual e melhor pontuação salva em localStorage
- **Animações**: Efeitos visuais suaves e feedback visual
- **Acessibilidade**: Suporte para modo escuro e navegação por teclado

## 🎮 Como Jogar

1. **Desktop**: Use as setas do teclado (↑↓←→) para controlar a direção da cobra
2. **Mobile**: Arraste o dedo na tela para direcionar a cobra
3. **Objetivo**: Coma as comidas (pontos vermelhos) para crescer e ganhar pontos
4. **Game Over**: O jogo termina se você colidir com as bordas ou com o próprio corpo

## 🚀 Execução Local

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, mas recomendado)

### Método 1: Abrir diretamente no navegador
1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` no seu navegador
3. O jogo estará pronto para jogar!

### Método 2: Usando servidor local (recomendado)
```bash
# Se você tem Python instalado
python -m http.server 8000

# Se você tem Node.js instalado
npx serve .

# Se você tem PHP instalado
php -S localhost:8000
```

Depois acesse `http://localhost:8000` no seu navegador.

## 🌐 Deploy Online

### Opção 1: Vercel (Recomendado)

1. **Crie uma conta no Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub, GitLab ou Bitbucket

2. **Deploy automático**:
   - Conecte seu repositório GitHub
   - O Vercel detectará automaticamente que é um projeto estático
   - Clique em "Deploy"

3. **Deploy manual**:
   ```bash
   # Instale o Vercel CLI
   npm i -g vercel

   # No diretório do projeto
   vercel
   ```

### Opção 2: GitHub Pages

1. **Crie um repositório no GitHub**:
   - Vá para [github.com](https://github.com)
   - Crie um novo repositório
   - Faça upload dos arquivos do projeto

2. **Configure o GitHub Pages**:
   - Vá para Settings > Pages
   - Em "Source", selecione "Deploy from a branch"
   - Escolha a branch "main" e pasta "/ (root)"
   - Clique em "Save"

3. **Acesse seu site**:
   - O site estará disponível em `https://seu-usuario.github.io/nome-do-repo`

### Opção 3: Netlify

1. **Acesse [netlify.com](https://netlify.com)**
2. **Arraste e solte** a pasta do projeto na área de deploy
3. **Ou conecte** seu repositório GitHub para deploy automático

## 📁 Estrutura do Projeto

```
snake-game/
├── index.html          # Arquivo principal HTML
├── style.css           # Estilos CSS
├── snake.js            # Lógica do jogo JavaScript
└── README.md           # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilos e animações
- **JavaScript ES6+**: Lógica do jogo
- **Canvas API**: Renderização gráfica
- **LocalStorage**: Persistência de dados
- **Touch Events**: Controles mobile

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `style.css`:
- Gradiente de fundo: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Cor da cobra: `#2ecc71`
- Cor da comida: `#e74c3c`

### Velocidade
A velocidade inicial do jogo pode ser ajustada em `snake.js`:
```javascript
this.gameSpeed = 150; // Menor = mais rápido
```

### Tamanho do Grid
O tamanho do grid pode ser alterado:
```javascript
this.gridSize = 20; // Tamanho de cada quadrado
```

## 📱 Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Chrome Mobile 60+

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🐛 Problemas Conhecidos

- Em alguns dispositivos Android, pode ser necessário tocar duas vezes para iniciar o jogo
- Em navegadores muito antigos, algumas animações CSS podem não funcionar

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, abra uma issue no GitHub ou entre em contato.

---

**Divirta-se jogando! 🎮**
