// script.js
$(document).ready(function() {
  var expenses = [];
  var chart = null;

  $('#expenseForm').submit(function(e) {
    e.preventDefault();
    var description = $('#description').val();
    var amount = parseFloat($('#amount').val());
    var category = $('#category').val();

    var expense = {
      description: description,
      amount: amount,
      category: category
    };

    expenses.push(expense);
    updateExpenseTable();
    updateTotalExpenses();
    updateChart();
    clearForm();
  });

  function updateExpenseTable() {
    var tableBody = $('#expenseTable tbody');
    tableBody.empty();

    for (var i = 0; i < expenses.length; i++) {
      var expense = expenses[i];
      var row = '<tr>' +
                  '<td>' + expense.description + '</td>' +
                  '<td>$' + expense.amount.toFixed(2) + '</td>' +
                  '<td>' + expense.category + '</td>' +
                '</tr>';
      tableBody.append(row);
    }
  }

  function updateTotalExpenses() {
    var totalExpenses = expenses.reduce(function(total, expense) {
      return total + expense.amount;
    }, 0);

    $('#totalExpenses').text('Total Expenses: $' + totalExpenses.toFixed(2));
  }

  function updateChart() {
    var categoryTotals = {};

    for (var i = 0; i < expenses.length; i++) {
      var expense = expenses[i];
      var category = expense.category;
      var amount = expense.amount;

      if (categoryTotals[category]) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    }

    var chartData = {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A']
      }]
    };

    var ctx = $('#expenseChart')[0].getContext('2d');

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'pie',
      data: chartData
    });
  }

  function clearForm() {
    $('#expenseForm')[0].reset();
  }
}); 