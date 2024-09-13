// Configuration for form fields (can be fetched from SharePoint or an API)
const formConfig = [
    {
        heading: 'Personal Details',
        fields: [
            { internalName: 'FirstName', displayName: 'First Name', type: 'SingleLine', mandatory: true, visible: true },
            { internalName: 'LastName', displayName: 'Last Name', type: 'SingleLine', mandatory: true, visible: true },
            { internalName: 'Description', displayName: 'Description', type: 'MultiLine', mandatory: false, visible: true },
        ]
    },
    {
        heading: 'Job Information',
        fields: [
            { internalName: 'JobTitle', displayName: 'Job Title', type: 'SingleLine', mandatory: true, visible: true },
            { internalName: 'Department', displayName: 'Department', type: 'Dropdown', mandatory: false, visible: true, options: ['HR', 'IT', 'Finance'] },
            { internalName: 'AssignedTo', displayName: 'Assigned To', type: 'PeopleOrGroup', mandatory: false, visible: true }
        ]
    }
];

// Generic function to generate a unique ID (for new items)
function generateUniqueID() {
    return 'ID-' + Date.now();
}

// Generic function to render form fields based on configuration
function renderFormFields(config, container) {
    config.forEach(group => {
        // Create group heading
        const groupHeading = $('<h3></h3>').text(group.heading);
        container.append(groupHeading);

        // Create fields
        group.fields.forEach(field => {
            if (field.visible) {
                const fieldGroup = $('<div class="field-group"></div>');
                
                const label = $('<label></label>')
                    .attr('for', field.internalName)
                    .text(field.displayName + (field.mandatory ? '*' : ''));
                
                let input;
                if (field.type === 'SingleLine') {
                    input = $('<input type="text"/>')
                        .attr('id', field.internalName)
                        .attr('name', field.internalName);
                } else if (field.type === 'MultiLine') {
                    input = $('<textarea></textarea>')
                        .attr('id', field.internalName)
                        .attr('name', field.internalName);
                } else if (field.type === 'Dropdown') {
                    input = $('<select></select>')
                        .attr('id', field.internalName)
                        .attr('name', field.internalName);
                    
                    field.options.forEach(option => {
                        input.append($('<option></option>').val(option).text(option));
                    });
                } else if (field.type === 'PeopleOrGroup') {
                    input = $('<input type="text"/>')
                        .attr('id', field.internalName)
                        .attr('name', field.internalName)
                        .attr('placeholder', 'Search People or Group...');
                }

                fieldGroup.append(label).append(input);
                container.append(fieldGroup);
            }
        });
    });
}

// Function to handle form save/submit actions
function handleFormSave(action) {
    const uniqueID = generateUniqueID();
    $('#uniqueID').val(uniqueID);

    const formData = $('#configurableForm').serializeArray();
    console.log('Form Data:', formData);

    if (action === 'submit') {
        // Submit for approval logic
        alert('Form Submitted for Approval!');
    } else {
        // Save form logic
        alert('Form Saved!');
    }
}

$(document).ready(function() {
    const formFieldsContainer = $('#formFields');
    
    // Initialize the form with dynamic fields
    renderFormFields(formConfig, formFieldsContainer);

    // Attach event handlers for form buttons
    $('#saveBtn').click(function() {
        handleFormSave('save');
    });

    $('#submitBtn').click(function() {
        handleFormSave('submit');
    });

    $('#cancelBtn').click(function() {
        window.location.href = 'home.html';
    });
});
