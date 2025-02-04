// ...
// Initialize friends and expenses arrays
let friends = [];
let expenses = [];

body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-image: url('images/background.jpg'); /* add background image */
    background-size: cover; /* cover the entire background */
    background-position: center; /* center the background image */
    height: 100vh; /* set the height to 100% of the viewport */
}
// Add friend functionality
document.getElementById('add-friend-btn').addEventListener('click', () => {
    const friendName = prompt('Enter friend\'s name:');
    if (friendName) {
        friends.push({ name: friendName, balance: 0 });
        renderFriendsList();
    }
});

// Add expense functionality
document.getElementById('add-expense-btn').addEventListener('click', () => {
    const expenseName = prompt('Enter expense name:');
    const expenseAmount = parseFloat(prompt('Enter expense amount:'));
    if (expenseName && expenseAmount) {
        expenses.push({ name: expenseName, amount: expenseAmount, splitAmong: [] });
        renderExpensesList();
    }
});

// Render friends list
function renderFriendsList() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';
    friends.forEach((friend) => {
        const friendListItem = document.createElement('li');
        friendListItem.textContent = friend.name;
        friendsList.appendChild(friendListItem);
    });
}

// Render expenses list
function renderExpensesList() {
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';
    expenses.forEach((expense) => {
        const expenseListItem = document.createElement('li');
        expenseListItem.textContent = `${expense.name} - $${expense.amount}`;
        expensesList.appendChild(expenseListItem);
    });
}

// Split expense functionality
expensesList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const expenseIndex = Array.prototype.indexOf.call(expensesList.children, e.target);
        const expense = expenses[expenseIndex];
        const splitAmong = prompt(`Split ${expense.name} among friends:`);
        if (splitAmong) {
            const splitFriends = splitAmong.split(',');
            expense.splitAmong = splitFriends.map((friend) => friend.trim());
            calculateBalance();
        }
    }
});

// Calculate balance
function calculateBalance() {
    friends.forEach((friend) => {
        friend.balance = 0;
        expenses.forEach((expense) => {
            if (expense.splitAmong.includes(friend.name)) {
                friend.balance += expense.amount / expense.splitAmong.length;
            }
        });
    });

    // Generate chart
    const balanceChart = document.getElementById('balance-chart');
    balanceChart.innerHTML = '';
    friends.forEach((friend) => {
        const bar = document.createElement('div');
        bar.style.width = `${friend.balance * 10}px`; // scale the width based on balance
        bar.style.height = '20px';
        bar.style.background-color = '#4CAF50'; // green bar
        balanceChart.appendChild(bar);
    });
}