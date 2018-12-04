export const formatMoney = (money) => money.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")

export const calculateAgePet = (date) => {
    let age = null;
    const today = new Date();
    const birthDate = new Date(date);
    const years = today.getFullYear() - birthDate.getFullYear();
    let month = 0;
    if (years === 0) {
        month = today.getMonth() - birthDate.getMonth();
        age = `${month} tháng`
    } else {
        if (today.getMonth() === birthDate.getMonth()) {
            age = `${years} năm`;
        }
        if (today.getMonth() > birthDate.getMonth()) {
            month = today.getMonth() - birthDate.getMonth();
            age = `${years} năm ${month} tháng`
        }
        if ((today.getMonth() < birthDate.getMonth()) && years === 1) {
            month = (12 - birthDate.getMonth()) + today.getMonth();
            age = `${month} tháng`
        }
        if ((today.getMonth() < birthDate.getMonth()) && years > 1) {
            month = (12 - birthDate.getMonth()) + today.getMonth();
            age = `${years - 1} năm ${month} tháng`
        }
    }

    return age;
}