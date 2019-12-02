const models = require('../../database/models');

const saveCustomFields = (fields, event) => {
    const customFields = [];
    fields.forEach(field => {
        models.CustomField.create(field).then((customField) =>{
            event.setCustomFields(customField);
        });
        customFields.push(field);
    });
    console.log(customFields);
    return customFields;   
}

module.exports = {
    saveCustomFields
}