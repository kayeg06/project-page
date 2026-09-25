// 1. Инициализация данных
// Пытаемся взять данные из localStorage. Если там пусто — берем тестовые.
let projects = JSON.parse(localStorage.getItem('projects')) || [
    {
        id: 1,
        name: "Разработка корпоративного сайта",
        description: "Создание современного адаптивного сайта для строительной компании."
    },
    {
        id: 2,
        name: "Мобильное приложение для доставки",
        description: "Приложение на iOS и Android для заказа еды."
    },
    {
        id: 3,
        name: "Внедрение CRM-системы",
        description: "Настройка системы управления взаимоотношениями с клиентами."
    },
    {
        id: 4,
        name: "Анализ данных и отчетность",
        description: "Сбор и визуализация данных для отдела маркетинга."
    }
];

// 2. Функция для сохранения данных в localStorage
function saveToLocalStorage() {
    // Превращаем массив в строку и сохраняем в браузере
    localStorage.setItem('projects', JSON.stringify(projects));
}

// 3. Функция для отрисовки карточек
function renderProjects(data) {
    const container = document.getElementById('projects-list');
    container.innerHTML = ''; // Очищаем контейнер

    data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = project.name;

        const desc = document.createElement('p');
        desc.textContent = project.description;

        card.appendChild(title);
        card.appendChild(desc);
        container.appendChild(card);
    });
}

// 4. Логика поиска
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    // Фильтруем текущий массив projects
    const filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(searchTerm);
    });
    renderProjects(filteredProjects);
    // ВАЖНО: Мы не сохраняем в localStorage при поиске, иначе мы затрём исходный список отфильтрованным!
});

// 5. Логика формы
const createBtn = document.getElementById('create-btn');
const formSection = document.getElementById('project-form');
const form = document.getElementById('form');
const nameInput = document.getElementById('project-name');
const descInput = document.getElementById('project-desc');

// Показываем форму при нажатии на кнопку "Создать проект"
createBtn.addEventListener('click', () => {
    formSection.classList.remove('hidden');
});

// Обрабатываем отправку формы
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Отменяем стандартную перезагрузку страницы

    // Получаем значения из полей
    const newName = nameInput.value.trim();
    const newDesc = descInput.value.trim();

    if (newName === '' || newDesc === '') return; // Простая проверка на пустые поля

    // Создаем новый объект проекта
    const newProject = {
        id: Date.now(), // Уникальный ID на основе текущего времени
        name: newName,
        description: newDesc
    };

    // Добавляем в массив
    projects.push(newProject);

    // Сохраняем в localStorage
    saveToLocalStorage();

    // Очищаем поля формы
    nameInput.value = '';
    descInput.value = '';

    // Скрываем форму обратно
    formSection.classList.add('hidden');

    // Очищаем поиск, чтобы новый проект точно был виден
    searchInput.value = '';

    // Перерисовываем список
    renderProjects(projects);
});

// 6. Первая отрисовка при загрузке страницы
renderProjects(projects);