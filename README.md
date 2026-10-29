# NEXUS® — Digital Realities

Landing page conceitual de um estúdio digital, criada como projeto de estudo de front-end com referências de experiências WebGL, narrativa visual e direção de arte imersiva.

## Stack
- React + Vite
- Three.js para objeto 3D em tempo real (geometria, iluminação, materiais físicos, partículas e interação com o ponteiro)
- GSAP + ScrollTrigger para animações de entrada e revelação durante a rolagem
- CSS responsivo, tipografia Manrope + DM Mono
- Lucide React para ícones

## Executar localmente
Requer Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço local mostrado pelo Vite (normalmente `http://localhost:5173`).

## Build de produção
```bash
npm run build
npm run preview
```

O build será gerado em `dist/`.

## Estrutura
```text
src/
  components/Scene3D.jsx   # Cena Three.js criada por código
  App.jsx                  # Seções e componentes da landing page
  main.jsx                 # Entrada React
  styles.css               # Design system e responsividade
index.html
```

## O que está implementado
- Hero cinematográfico com cena WebGL em tempo real
- Objeto geométrico metálico com anéis orbitais, luzes e partículas
- Interação de câmera com o ponteiro
- Animações de entrada e scroll reveal
- Projetos com artes abstratas geradas em CSS
- Seções de manifesto, serviços e contato
- Menu responsivo para dispositivos móveis
- Suporte a `prefers-reduced-motion`
- Metadados básicos de página e build de produção

## Próximos passos sugeridos
1. Substituir os projetos fictícios por estudos de caso reais.
2. Adicionar testes de acessibilidade e otimizar métricas Core Web Vitals.
3. Implementar carregamento progressivo e fallback estático caso WebGL não esteja disponível.
4. Criar modelos autorais no Blender e exportá-los em GLB/GLTF.
5. Integrar formulário de contato e analytics com consentimento.

## Créditos e referências
Projeto original de estudo. As referências serviram como direção criativa; textos, composição, nome e implementação deste projeto são próprios. O conteúdo visual 3D é gerado proceduralmente no navegador.
