document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');

    function createContactItem(name, phone, countryCode) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${name}: ${countryCode} ${phone}</span>
            <button class="remove-btn">Remove</button>
        `;

        li.querySelector('.remove-btn').addEventListener('click', () => {
            contactList.removeChild(li);
        });

        return li;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const countryCode = document.getElementById('country-code').value;

        if (name && phone && countryCode) {
            const contactItem = createContactItem(name, phone, countryCode);
            contactList.appendChild(contactItem);
            
            form.reset();
        }
    });
});
