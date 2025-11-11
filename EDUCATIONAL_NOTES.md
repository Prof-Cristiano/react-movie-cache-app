# 📚 Notas Educacionais - Movie Cache App

Este documento fornece orientações para professores e alunos sobre como usar esta aplicação para aprender conceitos de cache.

## 🎯 Objetivos de Aprendizado

Após explorar esta aplicação, os alunos devem ser capazes de:

1. ✅ Entender o que é cache e por que é importante
2. ✅ Implementar um sistema de cache básico em JavaScript/TypeScript
3. ✅ Configurar estratégias de TTL (Time To Live)
4. ✅ Implementar estratégias de cache LRU (Least Recently Used)
5. ✅ Monitorar e debugar cache em aplicações web
6. ✅ Integrar cache com APIs REST

## 🔍 Conceitos Principais

### 1. O Que é Cache?

Cache é uma camada de armazenamento temporário de alta velocidade que armazena um subconjunto de dados, geralmente transitórios, para que futuras requisições sejam atendidas mais rapidamente.

**Analogia:** Pense em uma biblioteca. Em vez de ir à estante toda vez que precisa de um livro frequentemente usado, você o mantém na sua mesa (cache) para acesso rápido.

### 2. Por Que Usar Cache?

- **Performance**: Reduz latência de rede
- **Custo**: Economiza chamadas de API (muitas APIs têm limites de taxa)
- **Disponibilidade**: Funciona mesmo se a API estiver temporariamente indisponível
- **Experiência do Usuário**: Interface mais responsiva

### 3. TTL (Time To Live)

TTL define quanto tempo um item permanece válido no cache antes de expirar.

**Nesta aplicação:**
- Filmes populares: 10 minutos (dados que mudam com frequência moderada)
- Gêneros: 24 horas (dados quase estáticos)
- Buscas: 5 minutos (dados específicos do usuário)

**Exercício:** Modifique os valores de TTL em `src/services/movieService.ts` e observe o comportamento.

### 4. Estratégia LRU

LRU (Least Recently Used) remove os itens menos recentemente usados quando o cache atinge seu limite.

**Nesta aplicação:**
- Limite de 100 itens
- Quando excedido, o item mais antigo é removido

**Exercício:** Reduza o limite para 3 itens em `src/services/cacheService.ts` e observe o comportamento ao fazer várias buscas.

## 🧪 Exercícios Práticos

### Exercício 1: Observando Cache Hits e Misses

1. Abra o console do navegador (F12)
2. Busque por "Matrix"
3. Observe: `[Cache] Miss: search_matrix_1`
4. Busque novamente por "Matrix"
5. Observe: `[Cache] Hit: search_matrix_1`

**Questão:** Por que a segunda busca foi instantânea?

### Exercício 2: Testando TTL

1. Faça uma busca
2. Espere 6 minutos (TTL de busca é 5 minutos)
3. Faça a mesma busca novamente
4. Observe: `[Cache] Expired: search_...`

**Questão:** Como você poderia implementar um cache que nunca expira?

### Exercício 3: Rastreamento de Popularidade

1. Busque por "Matrix" 3 vezes
2. Busque por "Avatar" 1 vez
3. Busque por "Star Wars" 2 vezes
4. Expanda "Cache Status"
5. Observe o ranking de buscas mais frequentes

**Questão:** Como isso poderia ser usado para otimizar o cache?

### Exercício 4: Modificando o Cache

**Tarefa:** Implemente cache para os detalhes de um filme específico

1. Crie uma função `getMovieDetails(id: number)` em `movieService.ts`
2. Use cache com TTL de 30 minutos
3. Teste a implementação

**Dica:** Siga o padrão das funções existentes.

### Exercício 5: Cache Distribuído

**Desafio Avançado:** Modifique o cache para usar `localStorage` em vez de memória.

**Vantagens:**
- Cache persiste entre recarregamentos
- Funciona offline

**Desvantagens:**
- Limite de ~5-10MB
- Pode ser mais lento que memória

## 🎨 Melhorias Sugeridas

### Nível Iniciante

1. **Adicionar mais informações ao cache stats**
   - Mostrar taxa de hit/miss
   - Mostrar tamanho total do cache em KB

2. **Implementar cache warming**
   - Pré-carregar filmes populares ao iniciar o app

3. **Adicionar indicador visual**
   - Ícone especial para dados vindos do cache

### Nível Intermediário

1. **Implementar diferentes estratégias de cache**
   - LFU (Least Frequently Used)
   - FIFO (First In First Out)
   - Permitir ao usuário escolher a estratégia

2. **Adicionar métricas avançadas**
   - Tempo médio de resposta
   - Economia de requisições
   - Gráficos de uso do cache

3. **Implementar invalidação inteligente**
   - Invalidar cache relacionado quando dados mudam
   - Cache em cascata (se invalida A, invalida B e C)

### Nível Avançado

1. **Service Worker para cache HTTP**
   - Implementar PWA com cache offline
   - Cache de imagens dos pôsteres

2. **Cache distribuído com IndexedDB**
   - Armazenamento estruturado
   - Queries complexas

3. **Sincronização de cache entre tabs**
   - Usar `BroadcastChannel` API
   - Compartilhar cache entre múltiplas abas

## 📖 Referências Adicionais

### Artigos e Documentos

- [MDN: HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Web.dev: Cache API](https://web.dev/cache-api-quick-guide/)
- [Patterns for Frontend Cache](https://martinfowler.com/articles/patterns-of-distributed-systems/cache.html)

### Bibliotecas Relacionadas

- **SWR**: React Hooks para data fetching com cache
- **React Query**: Gerenciamento de estado de servidor com cache
- **Axios Cache Adapter**: Plugin de cache para Axios
- **Workbox**: Service Worker para PWAs

### APIs para Prática

- [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api) - Usado neste projeto
- [OpenWeatherMap](https://openweathermap.org/api) - API de clima
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - API fake para testes
- [REST Countries](https://restcountries.com/) - API de países

## 💡 Dicas para Professores

### Estrutura de Aula Sugerida (2 horas)

**Hora 1: Teoria e Demonstração**
- 15 min: Introdução aos conceitos de cache
- 15 min: Demonstração ao vivo da aplicação
- 30 min: Code walkthrough dos serviços de cache

**Hora 2: Prática**
- 30 min: Exercícios guiados (1-3)
- 30 min: Projeto livre (melhorias sugeridas)

### Avaliação

**Critérios de Avaliação:**
1. Compreensão dos conceitos (30%)
2. Implementação correta (40%)
3. Qualidade do código (20%)
4. Criatividade nas melhorias (10%)

**Projeto Final Sugerido:**
Criar uma aplicação similar usando uma API diferente, implementando:
- Cache em memória
- TTL configurável
- Estatísticas de cache
- Interface visual atraente

## 🐛 Problemas Comuns e Soluções

### Problema 1: Cache não está funcionando

**Sintoma:** Sempre vê "Cache Miss" no console

**Possíveis Causas:**
- TTL muito curto
- Chaves de cache diferentes para mesma requisição
- Cache sendo limpo inadvertidamente

**Solução:** Verifique os logs e as chaves de cache no painel de estatísticas.

### Problema 2: Memória crescendo muito

**Sintoma:** Aplicação fica lenta após uso prolongado

**Possíveis Causas:**
- Muitos itens no cache
- Imagens grandes sendo armazenadas
- Limpeza de expirados não funcionando

**Solução:** Reduza MAX_CACHE_SIZE ou implemente limpeza mais agressiva.

### Problema 3: Dados desatualizados

**Sintoma:** Mudanças na API não aparecem

**Possíveis Causas:**
- TTL muito longo
- Cache não expirando corretamente

**Solução:** Implemente botão para forçar refresh ou reduza TTL.

## 🎓 Próximos Passos

Após dominar esta aplicação, explore:

1. **Cache HTTP no Backend**
   - Redis
   - Memcached
   - CDN caching

2. **Cache em Aplicações Mobile**
   - AsyncStorage (React Native)
   - SQLite
   - Realm

3. **Arquiteturas Avançadas**
   - Cache distribuído
   - Cache em múltiplas camadas
   - Invalidação de cache em sistemas distribuídos

---

**Boa sorte no aprendizado! 🚀**
