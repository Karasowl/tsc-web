document.addEventListener('DOMContentLoaded', async function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || '1';
    let data;
    try {
        const response = await fetch('/api/cotizaciones');
        data = await response.json();
    } catch (e) {
        showError('No se pudo cargar cotizaciones desde la base de datos');
        return;
    }
    const cotizacion = data.cotizaciones.find(c => c.id == id);
    if (!cotizacion) {
        showError('Cotización no encontrada.');
        return;
    }
    safeText('.client-info h1', cotizacion.cliente);
    safeText('.proposal-details p.text-muted', cotizacion.fecha);
    safeText('.proposal-details strong', cotizacion.contacto);
    // Sanitizar pdf_nombre para evitar comillas invertidas y espacios extra
    let pdfNombreSanitized = (cotizacion.pdf_nombre || '').replace(/[`\s]+/g, '').trim();
    let pdfPathSanitized = (cotizacion.pdf || '').replace(/[`\s]+/g, '').trim();
    // Establecer href y download correctamente
    safeAttr('#pdf-link-1', 'href', pdfNombreSanitized);
    safeAttr('#pdf-link-1', 'download', pdfNombreSanitized);
    // safeAttr('.proposal-details .download-btn', 'href', pdfPathSanitized);
    // safeAttr('.download-section .download-btn', 'href', pdfPathSanitized);
    safeAttr('.proposal-details .download-btn', 'download', pdfNombreSanitized);
    // safeAttr('.download-section .download-btn', 'download', pdfNombreSanitized);
    safeAttr('.video-container iframe', 'src', cotizacion.video);
    // Renderizado de servicios en la sección Valores Agregados Únicos de TSC
    const dynamicServices = document.getElementById('dynamic-services');
    if (dynamicServices) {
        console.log('cotizacion.servicios:', cotizacion.servicios);
        dynamicServices.innerHTML = '';
        let servicios = cotizacion.servicios;
        if (typeof servicios === 'string') {
            try {
                servicios = JSON.parse(servicios);
            } catch (e) {
                servicios = [];
            }
        }
        if (Array.isArray(servicios)) {
            servicios.forEach((grupo, i) => {
                const card = document.createElement('div');
                card.className = 'value-card wow fadeInUp';
                card.setAttribute('data-animation', 'fadeInUp');
                card.setAttribute('data-delay', `.${3+i}s`);
                let items = '';
                if (grupo.items && Array.isArray(grupo.items)) {
                    grupo.items.forEach(serv => { items += `<li>${serv}</li>`; });
                }
                card.innerHTML = `
                    <div class=\"value-card-icon\">\n                        <i class=\"${grupo.icono || ''}\"></i>\n                    </div>\n                    <h3>${grupo.titulo || ''}</h3>\n                    <p>${grupo.descripcion || ''}</p>\n                    <ul class=\"value-list\">${items}</ul>\n                `;
                dynamicServices.appendChild(card);
            });
        } else {
            dynamicServices.innerHTML = '<p>No hay servicios adicionales disponibles.</p>';
        }
    }

 // Renderizado de valueSection en la sección Valor Diferencial TSC
    const dynamicValueGrid = document.getElementById('dynamic-value-grid');
    if (dynamicValueGrid) {
         console.log('cotizacion.value:', cotizacion.valueSection);
        dynamicValueGrid.innerHTML = '';
        let valueSection = cotizacion.valueSection;
        if (typeof valueSection === 'string') {
            try {
                valueSection = JSON.parse(valueSection);
            } catch (e) {
                valueSection = [];
            }
        }
        if (Array.isArray(valueSection)) {
            valueSection.forEach((grupo, i) => {
                const card = document.createElement('div');
                card.className = 'value-card wow fadeInUp';
                card.setAttribute('data-animation', 'fadeInUp');
                card.setAttribute('data-delay', `.${3+i}s`);
                let items = '';
                if (grupo.items && Array.isArray(grupo.items)) {
                    grupo.items.forEach(item => { items += `<li>${item}</li>`; });
                }
                card.innerHTML = `
                    <div class=\"value-card-icon\"><i class=\"${grupo.icono || ''}\"></i></div>
                    <h3>${grupo.titulo || ''}</h3>
                    <p>${grupo.descripcion || ''}</p>
                    <ul class=\"value-list\">${items}</ul>
                `;
                dynamicValueGrid.appendChild(card);
            });
        } else {
            dynamicValueGrid.innerHTML = '<p>No hay valores diferenciales disponibles.</p>';
        }
    }

     // Renderizado de provIntegral 
    const provIntegral = document.getElementById('dynamic-value-grid2');
    if (provIntegral) {
         console.log('cotizacion.provIntegral:', cotizacion.provIntegral);
        provIntegral.innerHTML = '';
        let provIntegralData = cotizacion.provIntegral;
        if (typeof provIntegralData === 'string') {
            try {
                provIntegralData = JSON.parse(provIntegralData);
            } catch (e) {
                provIntegralData = [];
            }
        }
        if (Array.isArray(provIntegralData)) {
            provIntegralData.forEach((grupo, i) => {
                const col = document.createElement('div');
                col.className = `col-lg-4 wow fadeInUp`;
                col.setAttribute('data-animation', 'fadeInUp');
                col.setAttribute('data-delay', `.${3+i}s`);
                const card = document.createElement('div');
                card.className = 'value-card';
                let items = '';
                if (grupo.items && Array.isArray(grupo.items)) {
                    grupo.items.forEach(item => { items += `<li>${item}</li>`; });
                }
                card.innerHTML = `
                    <div class=\"value-card-icon\"><i class=\"${grupo.icono || ''}\"></i></div>
                    <h3>${grupo.titulo || ''}</h3>
                    <p>${grupo.descripcion || ''}</p>
                    <ul class=\"value-list\">${items}</ul>
                `;
                col.appendChild(card);
                provIntegral.appendChild(col);
            });
        } else {
            provIntegral.innerHTML = '<p>No hay valores diferenciales disponibles.</p>';
        }
    }

    // Renderizado de InfTec en la sección Infraestructura Tecnológica
    const techGrid = document.querySelector('.tech-grid');
    if (techGrid) {
        techGrid.innerHTML = '';
        let InfTec = cotizacion.InfTec;
        if (typeof InfTec === 'string') {
            try {
                InfTec = JSON.parse(InfTec);
            } catch (e) {
                InfTec = [];
            }
        }
        if (Array.isArray(InfTec)) {
            InfTec.forEach((grupo, i) => {
                const card = document.createElement('div');
                card.className = 'tech-feature wow fadeInUp';
                card.setAttribute('data-animation', 'fadeInUp');
                card.setAttribute('data-delay', `.${3+i}s`);
                let items = '';
                if (grupo.items && Array.isArray(grupo.items)) {
                    items = `<ul class=\"tech-list\">${grupo.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
                }
                card.innerHTML = `
                    <div class=\"tech-feature-visual\"><i class=\"${grupo.icono || ''}\"></i></div>
                    <div class=\"number\">${grupo.numero || ''}</div>
                    <h4>${grupo.titulo || ''}</h4>
                    <p>${grupo.descripcion || ''}</p>
                    ${items}
                `;
                techGrid.appendChild(card);
            });
        } else {
            techGrid.innerHTML = '<p>No hay infraestructura tecnológica disponible.</p>';
        }
    }



    const tbody = document.querySelector('.price-table tbody');
    let totalElementos = 0;
    let granTotalMensual = 0;
    if (tbody) {
        tbody.innerHTML = '';
        cotizacion.lineas.forEach(linea => {
            const safe = v => (v === undefined || v === null || v === "") ? "-" : v;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="UBICACIÓN"><span>${safe(linea.ubicacion)}</span></td>
                <td data-label="DESCRIPCIÓN"><span>${safe(linea.descripcion)}</span></td>
                <td data-label="DÍAS"><span>${safe(linea.dias)}</span></td>
                <td data-label="TURNO"><span>${safe(linea.turno)}</span></td>
                <td data-label="ELEMENTOS"><span>${safe(linea.elementos)}</span></td>
                <td data-label="MONTO UNITARIO"><span>${formatMoney(linea.unitario)}</span></td>
                <td data-label="TOTAL MENSUAL"><span>${formatMoney(linea.total)}</span></td>
            `;
            tbody.appendChild(tr);
            totalElementos += parseInt(linea.elementos) || 0;
            let totalMensual = 0;
            if (typeof linea.total === 'string') {
                totalMensual = parseFloat(linea.total.toString().replace(/[$,\s]/g, '')) || 0;
            } else if (typeof linea.total === 'number') {
                totalMensual = linea.total;
            }
            granTotalMensual += totalMensual;
        });
    }
    // Actualizar el total de elementos y gran total mensual en el footer
    const totalElementsRow = document.querySelector('.total-elements-row span strong');
    if (totalElementsRow) {
        totalElementsRow.textContent = `${totalElementos} ELEMENTOS EN TOTAL`;
    }
    const totalRow = document.querySelector('.total-row span strong');
    if (totalRow) {
        totalRow.textContent = granTotalMensual.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    }
    const totalCell = document.querySelector('.price-table tfoot .total-row span strong');
    // if (totalCell) totalCell.textContent = formatMoney(cotizacion.total);
    const servicios = document.querySelectorAll('.service-card ul.service-list');
    if (servicios.length) {
        for (let i = 0; i < servicios.length; i++) {
            servicios[i].innerHTML = (cotizacion.servicios[i] || []).map(s => `<li>${s}</li>`).join('');
        }
    }
    const gallery = document.querySelector('.gallery-grid');
    if (gallery) {
        gallery.innerHTML = '';
        cotizacion.galeria.forEach((img, i) => {
            const div = document.createElement('div');
            div.className = 'gallery-item wow fadeInUp';
            div.setAttribute('data-animation', 'fadeInUp');
            div.setAttribute('data-delay', `.3s`);
            div.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="gallery-overlay"></div>`;
            gallery.appendChild(div);
        });
    }
    const condiciones = document.querySelectorAll('.condition-box ul.condition-list');
    if (condiciones.length) {
        if (cotizacion.condiciones_comerciales)
            condiciones[0].innerHTML = cotizacion.condiciones_comerciales.map(c => `<li>${c}</li>`).join('');
        if (cotizacion.condiciones_operativas && condiciones[1])
            condiciones[1].innerHTML = cotizacion.condiciones_operativas.map(c => `<li>${c}</li>`).join('');
    }
    safeText('.company-info h3', cotizacion.empresa);
    safeText('.company-info h4', cotizacion.representante);
    safeText('.company-info .text-muted', cotizacion.puesto);
    const contactSpans = document.querySelectorAll('.contact-item span');
    if (contactSpans.length) {
        if (cotizacion.email) contactSpans[0].textContent = cotizacion.email;
        if (cotizacion.telefono && contactSpans[1]) contactSpans[1].textContent = cotizacion.telefono;
    }
});

function formatMoney(n) {
    if (n === null || n === undefined || isNaN(n)) return '$0.00';
    return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
}
function safeText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
}
function safeAttr(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
}
function showError(msg) {
    document.body.innerHTML = `<div style='color:#fff;background:#222;padding:60px 20px;font-size:2rem;text-align:center;'>${msg}</div>`;
}


