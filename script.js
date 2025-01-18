// Глобальные переменные
let hero;
let enemy;
let gameOver = false;

// Герои
const heroes = {
    warrior: {
        name: 'Воин',
        health: 150,
        strength: 30,
        defense: 25,
        weapon: 'меч',
        armor: 'латы'
    },
    mage: {
        name: 'Маг',
        health: 120,
        strength: 40,
        defense: 20,
        weapon: 'посох',
        armor: 'мантия'
    },
    archer: {
        name: 'Лучник',
        health: 130,
        strength: 35,
        defense: 22,
        weapon: 'лук',
        armor: 'кольчуга'
    }
};

// Враги
const enemies = {
    goblin: {
        name: 'Гоблин',
        health: 70,
        strength: 20,
        defense: 15
    },
    troll: {
        name: 'Тролль',
        health: 110,
        strength: 30,
        defense: 18
    },
    boss: {
        name: 'Главный Босс',
        health: 250,
        strength: 45,
        defense: 28
    }
};

// Функции игры
function selectHero(type) {
    hero = Object.assign({}, heroes[type]); // Копируем объект героя
    hideScreen('start-screen'); // Убираем экран выбора героя
    showScreen('equipment-screen'); // Переход к выбору снаряжения
}

function upgradeEquipment(type) {
    switch (type) {
        case 'weapon':
            hero.strength += 10;
            alert(`${hero.name} получил улучшенное оружие!`);
            break;
        case 'armor':
            hero.defense += 10;
            alert(`${hero.name} получил улучшенную броню!`);
            break;
        case 'health':
            hero.health += 50;
            alert(`${hero.name} восстановил здоровье!`);
            break;
    }
    startBattle(enemies.goblin); // Начинаем битву с первым врагом
}

function startBattle(enemyType) {
    enemy = Object.assign({}, enemyType); // Копируем объект врага
    showScreen('battle-screen'); // Переход к экрану битвы
}

function attackEnemy() {
    if (enemy.health <= 0) {
        if (enemy === enemies.boss) {
            endGame(true); // Победа над боссом
        } else {
            nextEnemy(); // Следующий враг
        }
    } else {
        const damage = Math.max(0, hero.strength - enemy.defense);
        enemy.health -= damage;
        logMessage(`${hero.name} нанес ${damage} урона ${enemy.name}.\nОсталось здоровья: ${enemy.health}`);

        if (enemy.health > 0) {
            const enemyDamage = Math.max(0, enemy.strength - hero.defense);
            hero.health -= enemyDamage;
            logMessage(`${enemy.name} нанес ${enemyDamage} урона ${hero.name}.\nОсталось здоровья: ${hero.health}`);

            if (hero.health <= 0) {
                endGame(false); // Поражение
            }
        }
    }
}

function nextEnemy() {
    if (enemy === enemies.goblin) {
        startBattle(enemies.troll); // Следующий враг - тролль
    } else if (enemy === enemies.troll) {
        startBossBattle(); // Последний враг - главный босс
    }
}

function startBossBattle() {
    showScreen('boss-battle-screen'); // Переход к экрану битвы с боссом
    setTimeout(() => {
        startBattle(enemies.boss); // Начинаем битву с главным боссом
    }, 3000); // Задержка перед началом битвы с боссом
}

function endGame(victory) {
    gameOver = true;
    if (victory) {
        showScreen('end-screen'); // Показываем экран победы
    } else {
        alert("К сожалению, вы проиграли."); // Сообщение о поражении
        restartGame(); // Перезапуск игры
    }
}

function restartGame() {
    gameOver = false;
    hero = null;
    enemy = null;
    showScreen('start-screen'); // Возвращаемся к начальному экрану
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function hideScreen(screenId) {
    document.getElementById(screenId).classList.add('hidden');
}

function logMessage(message) {
    const battleLog = document.getElementById('battle-log');
    battleLog.textContent += `${message}\n\n`;
}
