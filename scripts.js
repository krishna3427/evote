// Dummy storage for registered users and poll candidates
let users = [];
const candidates = [
    {
        name: 'YS Jagan Mohan Reddy',
        photo: 'https://github.com/krishna3427/evote/blob/98a88029b8358c96379dbf13435e0f1db1f63427/ys_jagan.jpg?raw=true',
        party: 'Yuvajana Sramika Rythu Congress Party (YSRCP)',
        details: 'Member of Legislative Assembly Andhra Pradesh. Incumbent Chief Minister since 19 June 2014.'
    },
    {
        name: 'N. Chandrababu Naidu',
        photo: 'https://github.com/krishna3427/evote/blob/main/chandrababu_naidu.jpg?raw=true',
        party: 'Telugu Desam Party (TDP)',
        details: '13th Chief Minister of Andhra Pradesh since 12 June 2024. Previously served as Chief Minister from 1995-2004.'
    },
    {
        name: 'Pawan Kalyan',
        photo: 'https://github.com/krishna3427/evote/blob/main/pawan_kalyan.jpg?raw=true',
        party: 'Janasena Party',
        details: '10th Deputy Chief Minister of Andhra Pradesh since 12 June 2024. President of the Janasena Party.'
    }
];


const votes = {};

// Handle showing login and signup forms
document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('login').style.display = 'block';
});

document.getElementById('signupBtn').addEventListener('click', function() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
});

// Signup process
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const name = document.getElementById('name').value;
    const aadharId = document.getElementById('aadharId').value;

    // Store the user information
    users.push({ username, password, name, aadharId });
    alert("Signup successful! Please login to cast your vote.");
    
    // Show login page
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
});

// Login process
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert("Login successful! You can now vote.");
        showVotingPage(username);
    } else {
        alert("Invalid Username or Password");
    }
});

// Function to show the voting page
function showVotingPage(username) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('voting').style.display = 'block';

    // Display candidates
    const candidatesContainer = document.getElementById('candidatesContainer');
    candidatesContainer.innerHTML = candidates.map(candidate => `
        <div class="candidate">
            <img src="${candidate.photo}" alt="${candidate.name}">
            <div class="info">
                <h3>${candidate.name}</h3>
                <p>${candidate.party}</p>
                <p>${candidate.details}</p>
            </div>
            <button onclick="confirmVote('${candidate.name}', '${username}')">Vote</button>
        </div>
    `).join('');
}

// Confirm vote
function confirmVote(candidateName, username) {
    const confirmation = confirm(`Do you want to cast your vote for ${candidateName}?`);
    if (confirmation) {
        if (!votes[username]) {
            votes[username] = candidateName;
            alert(`You have voted for ${candidateName}. Thank you!`);
            document.getElementById('voting').style.display = 'none';
            document.getElementById('thankYou').style.display = 'block';
        } else {
            alert("You have already voted.");
        }
    }
}

// Back to voting page
document.getElementById('backToVoting').addEventListener('click', function() {
    document.getElementById('candidateDetails').style.display = 'none';
    document.getElementById('voting').style.display = 'block';
});

// Admin Login and Vote Viewing
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const adminUsername = document.getElementById('adminUsername').value;
    const adminPassword = document.getElementById('adminPassword').value;

    if (adminUsername === 'admin' && adminPassword === '12345') {
        document.getElementById('adminSection').style.display = 'block';
        showVotes();
    } else {
        alert("Invalid admin credentials");
    }
});

// Display votes for admin
function showVotes() {
    const votesContainer = document.getElementById('votesContainer');
    votesContainer.innerHTML = Object.entries(votes).map(([username, candidateName]) => `
        <div class="vote">
            <p><strong>User:</strong> ${username}</p>
            <p><strong>Candidate:</strong> ${candidateName}</p>
        </div>
    `).join('');
}
