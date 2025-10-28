// Carga y muestra productos en index.html
async function loadProducts() {
  try {
    const products = await apiFetch('/products');
    const container = document.getElementById('products');
    container.innerHTML = products.map(p => productCardHtml(p)).join('');
  } catch (err) {
    console.error('Error cargando productos:', err);
    document.getElementById('products').innerHTML = '<p>Error cargando productos.</p>';
  }
}

function productCardHtml(p) {
  const img = p.image ? p.image : `https://picsum.photos/400/200?random=${p.id}`;
  return `
    <div class="card">
      <img src="${img}" alt="${escapeHtml(p.name)}">
      <h4>${escapeHtml(p.name)}</h4>
      <p>${escapeHtml(p.description || '')}</p>
      <div class="row" style="justify-content:space-between;align-items:center">
        <strong>$${Number(p.price).toFixed(2)}</strong>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="number" id="q-${p.id}" min="1" value="1" style="width:60px;padding:4px">
          <button class="btn" onclick="addToCart(${p.id})">Agregar</button>
        </div>
      </div>
    </div>
  `;
}

async function addToCart(productId) {
  const qty = Number(document.getElementById('q-' + productId).value || 1);
  try {
    await apiFetch('/cart/add', {
      method: 'POST',
      headers: { ...authHeaders() },
      body: { productId, quantity: qty }
    });
    alert('Agregado al carrito');
  } catch (err) {
    console.error('Error al agregar al carrito', err);
    if (err && (err.error === 'no auth header' || err.error === 'invalid token')) {
      if (confirm('Debes iniciar sesión para agregar al carrito. Ir a login?')) window.location = 'login.html';
    } else {
      alert('Error al agregar al carrito');
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, s => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[s]);
}

window.addEventListener('load', loadProducts);
