# 🚀 Deploy Rápido - Snake Game

## Opção 1: Vercel (Mais Fácil)

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login** com GitHub, GitLab ou Bitbucket
3. **Clique em "New Project"**
4. **Importe seu repositório** ou faça upload dos arquivos
5. **Clique em "Deploy"**
6. **Pronto!** Seu jogo estará online em segundos

## Opção 2: GitHub Pages

1. **Crie um repositório** no GitHub
2. **Faça upload** dos arquivos do projeto
3. **Vá em Settings > Pages**
4. **Selecione "Deploy from a branch"**
5. **Escolha branch "main" e pasta "/ (root)"**
6. **Clique em "Save"**
7. **Aguarde alguns minutos** e acesse o link fornecido

## Opção 3: Netlify

1. **Acesse [netlify.com](https://netlify.com)**
2. **Arraste e solte** a pasta do projeto
3. **Pronto!** O site será publicado automaticamente

## Teste Local

Para testar localmente antes do deploy:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## Arquivos Necessários

Certifique-se de que todos estes arquivos estão no seu projeto:
- ✅ `index.html`
- ✅ `style.css`
- ✅ `snake.js`
- ✅ `README.md`
- ✅ `vercel.json` (opcional, para Vercel)

## Link do Jogo

Após o deploy, você terá um link público como:
- Vercel: `https://seu-projeto.vercel.app`
- GitHub Pages: `https://seu-usuario.github.io/nome-do-repo`
- Netlify: `https://seu-projeto.netlify.app`
