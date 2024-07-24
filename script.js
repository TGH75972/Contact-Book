document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    const contacts = new Map();

    function createContactItem(name, phone) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${name}: ${phone}</span>
            <button class="remove-btn"> 🗑</button>
        `;

        li.querySelector('.remove-btn').addEventListener('click', () => {
            contacts.delete(phone);
            contactList.removeChild(li);
            saveContacts(); 
        });

        return li;
    }

    function saveContacts() {
        const contactsArray = Array.from(contacts.values());
        localStorage.setItem('contacts', JSON.stringify(contactsArray));
    }

    function loadContacts() {
        const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        savedContacts.forEach(contact => {
            const [name, phone] = contact.split(': ', 2);
            const contactItem = createContactItem(name, phone);
            contactList.appendChild(contactItem);
            contacts.set(phone, `${name}: ${phone}`);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const countryCode = document.getElementById('country-code').value.trim();

        const fullPhoneNumber = `${countryCode} ${phone}`;

        if (contacts.has(fullPhoneNumber)) {
            alert('This phone number with the same country code already exists!');
            return;
        }

        if (name && phone && countryCode) {
            const contactItem = createContactItem(name, fullPhoneNumber);
            contactList.appendChild(contactItem);
            contacts.set(fullPhoneNumber, `${name}: ${fullPhoneNumber}`);
            saveContacts(); 
            form.reset();
        }
    });

    loadContacts(); 
});
