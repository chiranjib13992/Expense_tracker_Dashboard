import apiService from "../../../services/apiService";
const baseUrl = 'http://localhost:3030/api'

const AddExpense = async (data) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/expense/create-expense`, data);
        console.log(res);
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const allExpenses = async () => {
    try {
        const res = await apiService.api.get(`${baseUrl}/expense/all-expenses`);
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const categoryWiseSpending = async () => {
    try {
        const res = await apiService.api.get(`${baseUrl}/expense/categoriwise-expenses`);
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const addIncome = async (data) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/expense/create-income`, data);
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const allDashboardData = async () => {
    try {
        const res = await apiService.api.get(`${baseUrl}/expense/all-dashboard-data`);
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const addToSavings = async (id) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/expense/add-to-savings`, { expenseId: id });
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const getTransactionById = async (id, type) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/expense/get-transaction`, { id, type });   
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}


const ExpenseService = {
    AddExpense,
    allExpenses,
    categoryWiseSpending,
    addIncome,
    allDashboardData,
    addToSavings,
    getTransactionById
}

export default ExpenseService;