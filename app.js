const express = require('express');
const mysql = require('mysql');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

const hbs = exphbs.create({
	helpers: {
		json: function (context) {
			return JSON.stringify(context);
		},
	},
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const db = mysql.createConnection({
	host: 'db4free.net',
	port: '3306',
	user: 'user_ange',
	password: 'divine@2022',
	database: 'financial_db',
	connectionLimit: 100,
	multipleStatements: true
});

db.connect((error) => {
	if (error) {
		console.error('Error connecting to database:', error);
		return;
	}
	console.log('Connected to MySQL database');
});

// Middleware to parse the request body (used for search functionality)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	const query = 'SELECT * FROM Indicator';
	db.query(query, (error, indicators) => {
		if (error) {
			console.error('Error fetching indicators:', error);
			return res.status(500).send('Error fetching indicators');
		}
		res.render('index', { indicators });
	});
});

app.post('/search', (req, res) => {
	const searchTerm = req.body.searchTerm;
	const query = `
    SELECT Indicator.name, IndicatorValues.year, IndicatorValues.percentage_value
    FROM Indicator
    JOIN IndicatorValues ON Indicator.id = IndicatorValues.indicator_id
    WHERE Indicator.name LIKE ?
    ORDER BY Indicator.name, IndicatorValues.year
`;
	db.query(query, [`%${searchTerm}%`], (error, results) => {
		if (error) {
			Console.error('Error fetching search results:', error);
			return res.status(500).send('Error fetching search results');
		}
		res.render('search-results', { results });
	});
});

app.listen(port, () => {
	console.log(`Server started and listening on port ${port}`);
});
