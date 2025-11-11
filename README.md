# 🎬 Movie Cache App

Aplicação React + Vite + TypeScript criada para ensinar aos alunos conceitos de **cache de dados** através de um exemplo prático de aplicação de filmes.

![Movie Cache App](https://github.com/user-attachments/assets/d3a08d90-d5fb-4812-b50b-31e6ddff0645)

## 📚 Sobre o Projeto

Esta aplicação demonstra como implementar e gerenciar um sistema de cache eficiente em aplicações web modernas. Utilizando uma API de filmes (The Movie Database), o app mostra na prática:

- ✅ Como armazenar dados em cache após a primeira requisição
- ⏱️ Implementação de TTL (Time To Live) para expiração de cache
- 🚀 Melhoria de performance com requisições instantâneas do cache
- 📊 Monitoramento de estatísticas de cache em tempo real
- 🔥 Rastreamento de buscas mais populares

## 🎯 Conceitos de Cache Implementados

### 1. **Cache em Memória**
- Armazenamento de dados usando `Map` do JavaScript
- Cache persistente durante a sessão do usuário
- Limpeza automática de itens expirados

### 2. **Estratégias de TTL (Time To Live)**
- **Filmes Populares**: 10 minutos
- **Categorias/Gêneros**: 10 minutos  
- **Buscas**: 5 minutos
- **Lista de Gêneros**: 24 horas (dados que mudam raramente)

### 3. **LRU (Least Recently Used)**
- Limite de 100 itens no cache
- Remoção automática dos itens mais antigos quando o limite é atingido

### 4. **Cache de Dados Frequentes**
- Rastreamento de termos de busca mais populares
- Priorização de dados mais acessados

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderna e rápida
- **The Movie Database (TMDB) API** - API gratuita de filmes

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── CacheStats.tsx  # Exibe estatísticas do cache
│   ├── GenreFilter.tsx # Filtro de gêneros
│   ├── MovieCard.tsx   # Card individual de filme
│   ├── MovieList.tsx   # Lista de filmes
│   └── SearchBar.tsx   # Barra de busca
├── hooks/              # Custom hooks
│   └── useMovies.ts    # Hook para gerenciar estado dos filmes
├── services/           # Serviços e lógica de negócio
│   ├── cacheService.ts # Implementação do cache
│   └── movieService.ts # Serviço de API de filmes
├── types/              # Definições TypeScript
│   └── movie.ts        # Tipos relacionados a filmes
├── App.tsx             # Componente principal
└── main.tsx            # Entry point
```

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Prof-Cristiano/react-movie-cache-app.git

# Entre no diretório
cd react-movie-cache-app

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Visualizar Build de Produção

```bash
npm run preview
```

## 🔑 Configuração da API (Opcional)

Por padrão, a aplicação usa dados mock para demonstração. Para usar dados reais:

1. Crie uma conta gratuita em [The Movie Database](https://www.themoviedb.org/)
2. Obtenha sua API key em [Settings > API](https://www.themoviedb.org/settings/api)
3. Substitua a chave no arquivo `src/services/movieService.ts`:

```typescript
const API_KEY = 'sua-chave-aqui'; // Substitua 'demo' pela sua chave
```

## 🎓 Recursos Educacionais

### Como Testar o Cache

1. **Primeira Requisição** - Observe no console do navegador:
   ```
   [Cache] Miss: popular_1
   ```

2. **Requisição Subsequente** - Cache em ação:
   ```
   [Cache] Hit: popular_1
   ```

3. **Cache Expirado** - Após o TTL:
   ```
   [Cache] Expired: popular_1
   ```

### Funcionalidades para Explorar

- 🔍 **Buscar Filmes** - Digite um termo e veja o cache ser criado
- 🎭 **Filtrar por Gênero** - Teste diferentes categorias
- 📊 **Ver Estatísticas** - Expanda o painel "Cache Status"
- 🔥 **Buscas Populares** - Faça várias buscas e veja o ranking
- 🗑️ **Limpar Cache** - Teste a limpeza manual do cache

## 📸 Screenshots

### Tela Principal
![Tela Principal](https://github.com/user-attachments/assets/d3a08d90-d5fb-4812-b50b-31e6ddff0645)

### Filtro de Gênero
![Filtro de Gênero](https://github.com/user-attachments/assets/d4989456-7b6f-4585-9c06-3c261cdb88c6)

## 🧪 Testes

```bash
# Executar linter
npm run lint

# Verificar tipos TypeScript
npm run build
```

## 📝 Licença

Este projeto é open source e está disponível para fins educacionais.

## 👨‍🏫 Para Professores

Este projeto é ideal para:
- Ensinar conceitos de cache e performance web
- Demonstrar integração com APIs REST
- Praticar React, TypeScript e hooks
- Entender gerenciamento de estado
- Aprender sobre otimização de aplicações

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## 📧 Contato

Para dúvidas ou sugestões sobre o uso educacional desta aplicação, abra uma issue no repositório.

---

**Desenvolvido para fins educacionais** 🎓
