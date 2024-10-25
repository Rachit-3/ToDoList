export const saveToLocalStorage =(tasks) => {
    return localStorage.setItem("TodoStorage", JSON.stringify(tasks));
}
export const getFromLocalStorage =() => {
    const taskList = localStorage.getItem("TodoStorage");
    if (!taskList) return [];
    return JSON.parse(taskList);
}