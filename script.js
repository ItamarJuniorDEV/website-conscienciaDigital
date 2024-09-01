// Função para iniciar o quiz com perguntas aleatórias
function startQuiz() {
    const quizData = [
        { question: "O que é inclusão digital?", choices: ["Acesso à internet e dispositivos tecnológicos", "Educação para todos", "Sistemas de Informação", "Desenvolvimento econômico"], answer: 0 },
        { question: "Qual é o principal desafio da inclusão digital?", choices: ["Custo elevado de dispositivos", "Falta de água", "Baixa produção agrícola", "Criação de empregos"], answer: 0 },
        { question: "Como a inclusão digital impacta a educação?", choices: ["Facilitando o acesso a recursos educacionais online", "Melhorando a infraestrutura escolar", "Aumentando o número de escolas físicas", "Reduzindo o número de professores"], answer: 0 },
        { question: "Qual é o papel da telemedicina na inclusão digital?", choices: ["Facilitar o acesso a cuidados de saúde", "Construir mais hospitais", "Aumentar o número de médicos", "Promover campanhas de saúde"], answer: 0 },
        { question: "Como as parcerias público-privadas ajudam na inclusão digital?", choices: ["Expandindo a infraestrutura digital", "Aumentando impostos", "Reduzindo o número de empresas", "Promovendo monopólios"], answer: 0 },
        // Adicione mais perguntas relevantes aqui
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = []; // Para armazenar as respostas do usuário
    let questionsOrder = shuffleArray([...Array(quizData.length).keys()]); // Embaralha a ordem das perguntas

    function loadQuestion() {
        if (currentQuestion < quizData.length) {
            const quizContainer = document.getElementById('quiz-container');
            const q = quizData[questionsOrder[currentQuestion]];
            document.getElementById('quiz-progress').textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
            quizContainer.innerHTML = `
                <h3>${q.question}</h3>
                ${q.choices.map((choice, index) => `
                    <button class="btn btn-secondary my-2" onclick="selectAnswer(${index})">${choice}</button>
                `).join('')}
            `;
        } else {
            showResults();
        }
    }

    window.selectAnswer = function(index) {
        userAnswers.push({ question: quizData[questionsOrder[currentQuestion]].question, selected: index, correct: quizData[questionsOrder[currentQuestion]].answer });
        if (index === quizData[questionsOrder[currentQuestion]].answer) {
            score++;
        }
        currentQuestion++;
        loadQuestion();
    };

    function showResults() {
        const quizContainer = document.getElementById('quiz-results');
        let resultHTML = `<h3>Você acertou ${score} de ${quizData.length} perguntas!</h3>`;
        userAnswers.forEach((answer, idx) => {
            const correct = answer.selected === answer.correct ? 'Correto' : 'Incorreto';
            resultHTML += `<p><strong>${idx + 1}. ${answer.question}</strong> - Sua resposta: ${quizData[questionsOrder[idx]].choices[answer.selected]} (${correct})</p>`;
        });
        quizContainer.innerHTML = resultHTML;
    }

    loadQuestion();
}

// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicializando o mapa interativo com Leaflet
function initializeMap() {
    var map = L.map('map').setView([-14.235, -51.9253], 4); // Coordenadas para centralizar o mapa no Brasil

    // Adicionando um tile layer ao mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Definindo níveis de acesso à internet
    const acessoAlto = "Alto Acesso à Internet";
    const acessoMedio = "Médio Acesso à Internet";
    const acessoBaixo = "Baixo Acesso à Internet";

    // Lista de capitais com coordenadas e nível de acesso à internet
    const capitais = [
        { nome: "São Paulo", coords: [-23.55052, -46.633308], acesso: acessoAlto, porcentagem: 80 },
        { nome: "Brasília", coords: [-15.7801, -47.9292], acesso: acessoAlto, porcentagem: 78 },
        { nome: "Fortaleza", coords: [-3.71722, -38.5433], acesso: acessoMedio, porcentagem: 65 },
        { nome: "Salvador", coords: [-12.9714, -38.5014], acesso: acessoMedio, porcentagem: 60 },
        { nome: "Belo Horizonte", coords: [-19.9166813, -43.9344931], acesso: acessoAlto, porcentagem: 77 },
        { nome: "Rio de Janeiro", coords: [-22.9068, -43.1729], acesso: acessoAlto, porcentagem: 82 },
        { nome: "Porto Alegre", coords: [-30.0346, -51.2177], acesso: acessoAlto, porcentagem: 79 },
        { nome: "Curitiba", coords: [-25.4284, -49.2733], acesso: acessoAlto, porcentagem: 81 },
        { nome: "Recife", coords: [-8.0476, -34.877], acesso: acessoMedio, porcentagem: 63 },
        { nome: "Manaus", coords: [-3.119, -60.0217], acesso: acessoBaixo, porcentagem: 50 },
        { nome: "Belém", coords: [-1.455, -48.5024], acesso: acessoBaixo, porcentagem: 48 },
        { nome: "Goiânia", coords: [-16.6869, -49.2648], acesso: acessoMedio, porcentagem: 66 },
        { nome: "São Luís", coords: [-2.53911, -44.2829], acesso: acessoBaixo, porcentagem: 55 },
        { nome: "Maceió", coords: [-9.66599, -35.735], acesso: acessoMedio, porcentagem: 62 },
        { nome: "Teresina", coords: [-5.08921, -42.8016], acesso: acessoBaixo, porcentagem: 54 },
        { nome: "Natal", coords: [-5.79448, -35.211], acesso: acessoMedio, porcentagem: 61 },
        { nome: "Campo Grande", coords: [-20.4697, -54.6201], acesso: acessoMedio, porcentagem: 64 },
        { nome: "Cuiabá", coords: [-15.601, -56.0974], acesso: acessoMedio, porcentagem: 67 },
        { nome: "Aracaju", coords: [-10.9472, -37.0731], acesso: acessoBaixo, porcentagem: 53 },
        { nome: "João Pessoa", coords: [-7.11509, -34.8641], acesso: acessoMedio, porcentagem: 60 },
        { nome: "Florianópolis", coords: [-27.5954, -48.548], acesso: acessoAlto, porcentagem: 80 },
        { nome: "Macapá", coords: [0.034934, -51.0694], acesso: acessoBaixo, porcentagem: 45 },
        { nome: "Palmas", coords: [-10.1689, -48.3317], acesso: acessoBaixo, porcentagem: 51 },
        { nome: "Rio Branco", coords: [-9.97499, -67.8243], acesso: acessoBaixo, porcentagem: 44 },
        { nome: "Boa Vista", coords: [2.82384, -60.6753], acesso: acessoBaixo, porcentagem: 47 },
        { nome: "Porto Velho", coords: [-8.76077, -63.9039], acesso: acessoBaixo, porcentagem: 49 },
        { nome: "Vitória", coords: [-20.3155, -40.3128], acesso: acessoAlto, porcentagem: 75 }
    ];

    // Definindo cores para cada nível de acesso
    const cores = {
        [acessoAlto]: "#00FF00",
        [acessoMedio]: "#FFFF00",
        [acessoBaixo]: "#FF0000"
    };

    // Adicionando os marcadores ao mapa com base no nível de acesso
    capitais.forEach(function(capital) {
        L.marker(capital.coords, {
            icon: L.divIcon({
                className: 'custom-icon',
                html: `<i class="fas fa-circle" style="color: ${cores[capital.acesso]};"></i>`
            })
        }).addTo(map)
            .bindPopup(`<strong>${capital.nome}</strong><br>${capital.acesso}<br>${capital.porcentagem}% de acesso à internet`);
    });
}

// Inicializando o gráfico com Chart.js
function initializeChart() {
    var ctx = document.getElementById('grafico-inclusao').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar', // ou 'line', 'pie', etc.
        data: {
            labels: ['Região Norte', 'Região Nordeste', 'Região Centro-Oeste', 'Região Sudeste', 'Região Sul'],
            datasets: [{
                label: 'Acesso à Internet (%)',
                data: [30, 40, 60, 80, 90], // Exemplos de dados, adapte conforme necessário
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para adicionar comentários
function addComment(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;

    const commentList = document.getElementById('comentarios-list');
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <strong>${nome}</strong>
        <p>${comentario}</p>
        <button class="edit-btn btn btn-sm btn-outline-primary">Editar</button>
        <button class="delete-btn btn btn-sm btn-outline-danger">Excluir</button>
        <hr>
    `;
    commentList.appendChild(commentDiv);

    document.getElementById('comentario-form').reset();

    // Funções para editar e excluir comentários
    const editBtn = commentDiv.querySelector('.edit-btn');
    const deleteBtn = commentDiv.querySelector('.delete-btn');

    editBtn.addEventListener('click', function() {
        const newComment = prompt('Edite seu comentário:', comentario);
        if (newComment) {
            commentDiv.querySelector('p').textContent = newComment;
        }
    });

    deleteBtn.addEventListener('click', function() {
        commentList.removeChild(commentDiv);
    });
}

// Chamada para inicializar o mapa, gráfico e configuração de evento de comentários após o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeChart();
    document.getElementById('comentario-form').addEventListener('submit', addComment);
});
