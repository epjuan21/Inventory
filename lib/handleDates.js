const formatDate = (date) => {
    const dateStr = new Date(date).toISOString().split('T')[0]
    return dateStr
}

module.exports = {
    formatDate
}
