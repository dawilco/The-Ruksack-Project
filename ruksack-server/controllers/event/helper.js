const models = require('../../database/models');

const saveCustomFields = (fields, event) => {
    const customFields = [];
    fields.forEach(field => {
        models.CustomField.create(field).then((customField) =>{
            customFields.push(customField);
            event.setCustomFields(customField);
        });
    });
    return customFields;       
}

module.exports = {
    saveCustomFields
}