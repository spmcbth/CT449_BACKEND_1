const express = require('express');
const cors = require('cors');
const contactRouter = require('./app/routes/contact.route');
const ApiError = require('./app/api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});

app.use('/api/contacts', contactRouter);

// Handle 404 response
app.use((req, res, next) => {
    // Gọi next() để chuyển sang middleware xử lý lỗi
    // khi không có route nào được định nghĩa khớp với yêu cầu
    return next(new ApiError(404, 'Resource not found'));
});

// Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;