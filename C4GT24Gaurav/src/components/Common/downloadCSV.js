export const downloadCSV = (responses) => {
    const csvRows = [
        ['Username', 'Submitted At', 'time']
    ];

    responses.forEach(response => {
        const answers = response.answers.map(answer => `${answer.field}: ${answer.value}`).join('; ');
        csvRows.push([response.user || 'Anonymous', new Date(response.submitted_at).toLocaleString(), answers]);
    });

    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'responses.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
