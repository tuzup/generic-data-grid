export function transformToStandard(text) {
    // Replace text after underscore inside parentheses
    text = text.replace(/_(\w+)/g, ' ($1)');
    let formattedText = text.replace(/_/g, ' (');

    // Insert a space before uppercase letters except for text inside parentheses
    formattedText = formattedText.replace(/([a-z])([A-Z](?=[^)]*(?:\(|$)))/g, '$1 $2');


    // Capitalize the first letter of each word
    formattedText = formattedText
        .split(' ') // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
        .join(' '); // Join back into a single string

    return formattedText;
}
