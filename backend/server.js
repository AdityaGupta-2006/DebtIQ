const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const { calculateEMI } = require('./emiCalculator');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'debtiq-super-secret-key';

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
        req.user = user;
        next();
    });
};

app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const query = `INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, username, email, hashedPassword], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ error: 'Username or email already exists.' });
            }
            return res.status(500).json({ error: err.message });
        }
        
        const token = jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ message: 'User created successfully', token, user: { id: userId, username, email } });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password.' });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    });
});

app.get('/api/loans', authenticateToken, (req, res) => {
    const query = `SELECT * FROM loans WHERE user_id = ? ORDER BY created_at DESC`;
    db.all(query, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, data: rows });
    });
});

app.post('/api/loans', authenticateToken, (req, res) => {
    const { name, principal, annualRate, months, startDate, lender } = req.body;

    try {
        const emiDetails = calculateEMI(principal, annualRate, months);
        const loanId = uuidv4();

        const query = `INSERT INTO loans (
            id, user_id, name, principal, annual_rate, months, start_date, lender, 
            monthly_emi, total_amount, total_interest, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            loanId, req.user.id, name, principal, annualRate, months, startDate, lender,
            emiDetails.monthlyEMI, emiDetails.totalAmount, emiDetails.totalInterest, 'active'
        ];

        db.run(query, params, function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            db.get(`SELECT * FROM loans WHERE id = ?`, [loanId], (err, row) => {
                res.status(201).json({ success: true, data: row });
            });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/loans/:id', authenticateToken, (req, res) => {
    const query = `DELETE FROM loans WHERE id = ? AND user_id = ?`;
    db.run(query, [req.params.id, req.user.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Loan not found or unauthorized' });
        res.json({ success: true, message: 'Loan deleted successfully' });
    });
});

app.get('/api/loans/stats', authenticateToken, (req, res) => {
    const query = `
        SELECT 
            COUNT(*) as totalLoans,
            SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as activeLoans,
            SUM(principal) as totalPrincipal,
            SUM(CASE WHEN status = 'active' THEN monthly_emi ELSE 0 END) as totalMonthlyEMI,
            SUM(total_interest) as totalInterest
        FROM loans 
        WHERE user_id = ?
    `;
    db.get(query, [req.user.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const stats = {
            totalLoans: row.totalLoans || 0,
            activeLoans: row.activeLoans || 0,
            totalPrincipal: Math.round((row.totalPrincipal || 0) * 100) / 100,
            totalMonthlyEMI: Math.round((row.totalMonthlyEMI || 0) * 100) / 100,
            totalInterest: Math.round((row.totalInterest || 0) * 100) / 100
        };
        
        res.json({ success: true, data: stats });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
