const dateFormeter = (dateString) => {
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", option);

    const hour = date.getHours();
    const minute = date.getMinutes();

    const period = hour >= 12 ? "PM" : "AM";
    const formattedTime = `${hour % 12}:${minute.toString().padStart(2, "0")} ${period}`;
    return `${formattedDate}`;

}

export default dateFormeter;