// Функція для отримання всіх студентів і оновлення таблиці
async function loadStudents() {
    const response = await fetch('http://localhost:8081/students');
    if (response.ok) {
        const students = await response.json();
        const tableBody = document.getElementById('students-list');
        tableBody.innerHTML = ''; // Очищаємо таблицю перед заповненням

        // Додаємо студентів до таблиці
        students.forEach(student => {
            const tr = document.createElement('tr');

            const tdFirstName = document.createElement('td');
            tdFirstName.textContent = student.firstName;
            tr.appendChild(tdFirstName);

            const tdLastName = document.createElement('td');
            tdLastName.textContent = student.secondName;
            tr.appendChild(tdLastName);

            const tdClassNumber = document.createElement('td');
            tdClassNumber.textContent = student.classNumber;
            tr.appendChild(tdClassNumber);

            tableBody.appendChild(tr);
        });
    }
}

// Викликаємо функцію для завантаження студентів при завантаженні сторінки
window.onload = loadStudents;

// Обробка події надіслання форми
document.getElementById('student-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const classNumber = document.getElementById('class-number').value;

    // Відправляємо запит на сервер для додавання нового студента
    const response = await fetch('http://localhost:8081/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, secondName: lastName, classNumber })
    });

    if (response.ok) {
        // Оновлюємо список студентів після додавання нового
        loadStudents();

        // Очищаємо поля форми після додавання
        document.getElementById('student-form').reset();
    } else {
        alert('Помилка при додаванні студента');
    }
});
