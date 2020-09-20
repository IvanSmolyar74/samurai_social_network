export const required = (value) => {
    if (value) return undefined;
    return 'Поле не может быть пустым';
}

export const maxLength = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Максимальное число символов ${maxLength}, у вас ${value.length}`;
    return  undefined;
}