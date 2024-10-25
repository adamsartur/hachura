# Aplicação de Desenho de Hachuras

Uma aplicação web que permite aos usuários desenhar e excluir hachuras em imagens obtidas de uma API. A aplicação suporta zoom, navegação entre páginas e armazena as hachuras no armazenamento local do navegador para persistência.

## Visão Geral

A **Aplicação de Desenho de Hachuras** permite que os usuários desenhem hachuras retangulares diretamente nas imagens. Os usuários podem interagir com imagens recuperadas de uma API, navegar por múltiplas páginas, aplicar zoom para visualização detalhada e gerenciar suas hachuras de forma eficaz. As hachuras são armazenadas localmente, garantindo que persistam entre sessões.

## Recursos

- **Desenhar Hachuras**: Clique e arraste para desenhar hachuras retangulares nas imagens.
- **Excluir Hachuras**: Clique em uma hachura existente para excluí-la.
- **Zoom**: Aplique zoom nas imagens usando a roda do mouse.
- **Navegação entre Páginas**: Navegue entre as imagens usando controles intuitivos.
- **Armazenamento Persistente**: As hachuras são salvas no armazenamento local para persistência.
- **Indicador de Carregamento**: Um carregador é exibido enquanto as imagens estão sendo obtidas.
  - **Nota**: Não é possível desenhar ou excluir hachuras enquanto o carregador estiver visível.
- **Design Responsivo**: A aplicação se ajusta a diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **HTML5**: Estrutura e layout da aplicação web.
- **CSS3**: Estilização e design responsivo.
- **JavaScript (ES6+)**: Lógica da aplicação e interatividade.
- **Canvas API**: Desenho e gerenciamento de hachuras.
- **Fetch API**: Comunicação com a API backend.
- **Armazenamento Local**: Persistência dos dados do usuário entre sessões.

## Instalação

### Pré-requisitos

- Um navegador web moderno (por exemplo, Chrome, Firefox, Edge).
- Conexão ativa com a internet para obter imagens da API.

### Passos

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seuusuario/hachura-drawing-app.git
   ```

2. **Navegue até o Diretório do Projeto**

   ```bash
   cd hachura-drawing-app
   ```

3. **Abra a Aplicação**

   Abra o arquivo `index.html` em um browser.

## Uso

### Ativando o Modo de Desenho

- Clique no botão **"Ativar modo desenho"** na parte superior da página para alternar o modo de desenho ativado ou desativado.
- O texto do botão mudará para **"Desativar modo desenho"** quando o modo de desenho estiver ativo.

### Desenhando e Excluindo Hachuras

- **Desenhando**:
  - Com o modo de desenho ativado, clique e arraste na imagem para criar uma hachura.
  - Você pode desenhar em qualquer direção; a aplicação normaliza as coordenadas do retângulo.
- **Excluindo**:
  - Clique em uma hachura existente para excluí-la.
  - A exclusão funciona independentemente de o modo de desenho estar ativo ou não.
  - **Nota**: Não é possível desenhar ou excluir hachuras enquanto o carregador estiver visível.

### Zoom

- Use a roda do mouse sobre a imagem para aplicar zoom in ou out.
  - Role para cima para ampliar (zoom in).
  - Role para baixo para reduzir (zoom out).
- O zoom é restrito entre 0.5x e 3x para manter a qualidade da imagem e evitar distorções.

### Navegação entre Páginas

- Use os botões de navegação na parte inferior da página:
  - **<<**: Voltar 10 páginas.
  - **<**: Ir para a página anterior.
  - **>**: Ir para a próxima página.
  - **>>**: Avançar 10 páginas.
- O número da página atual e o total de páginas são exibidos entre os botões.

### Detalhes Implementação

- Em um refinement ou planning, eu iria confirmar algumas expectativas do comportamento que acabei assumindo da seguinte forma:
  - Remover Hachura fica disponível em modo desenho; pra mim não estava claro
  - A api não envia o Header que autoriza o acesso do javascript ao parametro total_page, sendo assim se não for recebido estou defaultando para 100