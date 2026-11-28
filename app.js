(function () {
  'use strict';

  const MENU = [
    { id: 'entrees', label: 'Entrees', items: [
      { id: 'tinga', name: 'Chicken Tinga Burrito', description: 'Chipotle chicken, rice, beans, queso fresco, and salsa roja.', price: 13.5 },
      { id: 'asada', name: 'Carne Asada Bowl', description: 'Grilled steak, cilantro rice, black beans, pico de gallo, and lime.', price: 14.75 },
      { id: 'veggie', name: 'Roasted Veggie Quesadilla', description: 'Seasonal vegetables, melted cheese, pico de gallo, and crema.', price: 11.5 }
    ]},
    { id: 'sides', label: 'Sides', items: [
      { id: 'chips', name: 'Chips & Salsa', description: 'Crisp corn tortilla chips with house salsa roja.', price: 5 },
      { id: 'guac', name: 'Guacamole', description: 'Fresh avocado, lime, cilantro, and sea salt.', price: 6 }
    ]},
    { id: 'drinks', label: 'Drinks', items: [
      { id: 'horchata', name: 'Horchata', description: 'House-made rice milk with cinnamon.', price: 4 },
      { id: 'agua', name: 'Agua de Jamaica', description: 'Tart hibiscus tea, lightly sweetened.', price: 4 }
    ]}
  ];
  const FLAT_MENU = MENU.flatMap((section) => section.items);
  const SERVICE_FEE_RATE = 0.1;
  const PROMO_AMOUNT = 5;
  const state = { view: 'menu', section: 'entrees', cart: [], promo: false, promoCode: '', promoMessage: '', promoStatus: 'idle', payment: 'card', mode: 'ready', order: null };
  const $ = (selector) => document.querySelector(selector);
  const money = (value) => '$' + value.toFixed(2);
  const itemFor = (id) => FLAT_MENU.find((item) => item.id === id);
  const count = () => state.cart.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = () => state.cart.reduce((sum, line) => sum + itemFor(line.id).price * line.qty, 0);
  const discount = () => state.promo ? PROMO_AMOUNT : 0;
  const serviceFee = () => (subtotal() - discount()) * SERVICE_FEE_RATE;
  const total = () => subtotal() - discount() + serviceFee();

  function escapeText(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
  function setMode(mode) { state.mode = mode; render(); }
  function openNavigation() {
    const dialog = $('#account-nav');
    $('#nav-backdrop').hidden = false;
    $('.prototype-header__menu').setAttribute('aria-expanded', 'true');
    dialog.showModal();
  }
  function closeNavigation() {
    const dialog = $('#account-nav');
    if (dialog.open) dialog.close();
    $('#nav-backdrop').hidden = true;
    $('.prototype-header__menu').setAttribute('aria-expanded', 'false');
  }
  function add(id) {
    const existing = state.cart.find((line) => line.id === id);
    if (existing) existing.qty += 1;
    else state.cart.push({ id, qty: 1 });
    toast(itemFor(id).name + ' added to your cart.', 'success');
    render();
  }
  function changeQty(id, delta) {
    const line = state.cart.find((entry) => entry.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty < 1) state.cart = state.cart.filter((entry) => entry.id !== id);
    render();
  }
  function remove(id) { state.cart = state.cart.filter((line) => line.id !== id); render(); }
  function toast(message, variant) {
    const node = document.createElement('div');
    node.className = 'rail-toast rail-toast--' + variant;
    node.setAttribute('role', 'alert');
    node.innerHTML = '<div class="rail-toast__icon" aria-hidden="true">●</div><div class="rail-toast__content"><span class="rail-toast__message">' + escapeText(message) + '</span></div><button class="rail-toast__dismiss" type="button" aria-label="Dismiss">×</button>';
    node.querySelector('button').addEventListener('click', () => node.remove());
    $('#toast-region').appendChild(node);
    window.setTimeout(() => node.remove(), 3500);
  }
  function renderStatus() {
    const host = $('#status-region');
    if (state.mode === 'loading') {
      host.innerHTML = '<div class="prototype-item-grid"><div class="rail-card rail-card--loading" aria-busy="true"><div class="rail-card__body"><div class="rail-card__skeleton rail-card__skeleton--title"></div><div class="rail-card__skeleton rail-card__skeleton--text"></div></div></div><div class="rail-card rail-card--loading" aria-busy="true"><div class="rail-card__body"><div class="rail-card__skeleton rail-card__skeleton--title"></div><div class="rail-card__skeleton rail-card__skeleton--text"></div></div></div></div>';
      return;
    }
    if (state.mode === 'error') { host.innerHTML = '<div class="prototype-error"><strong>We couldn’t load the menu.</strong><p class="type-caption">Something went wrong while fetching the latest items.</p><button class="rail-button rail-button--secondary" type="button" data-state="ready">Try again</button></div>'; return; }
    if (state.mode === 'offline') { host.innerHTML = '<div class="prototype-offline"><strong>You’re offline.</strong><p class="type-caption">Your cart is saved on this device. Reconnect to complete checkout.</p></div>'; return; }
    host.innerHTML = '';
  }
  function renderTabs() {
    $('#menu-tabs').innerHTML = MENU.map((section) => '<button class="rail-tab ' + (section.id === state.section ? 'rail-tab--active' : '') + '" type="button" role="tab" aria-selected="' + (section.id === state.section) + '" data-section="' + section.id + '">' + section.label + '</button>').join('');
  }
  function renderMenu() {
    renderTabs();
    const section = MENU.find((entry) => entry.id === state.section);
    if (state.mode !== 'ready') { $('#menu-content').innerHTML = ''; return; }
    $('#menu-content').innerHTML = '<div class="prototype-section-heading"><h2 class="type-heading">' + section.label + '</h2><p class="type-caption">Made fresh to order</p></div><div class="prototype-item-grid">' + section.items.map((item) => '<article class="rail-card rail-card--image-top prototype-item"><div class="rail-card__image prototype-dish-placeholder prototype-dish-placeholder--' + item.id + '" role="img" aria-label="' + item.name + ' image"></div><div class="rail-card__body"><div class="prototype-item__top"><h3 class="rail-card__title">' + item.name + '</h3><span class="prototype-item__price type-mono">' + money(item.price) + '</span></div><p class="rail-card__description">' + item.description + '</p><div class="rail-card__actions"><button class="rail-button rail-button--secondary prototype-item__add" type="button" data-add="' + item.id + '">Add</button></div></div></article>').join('') + '</div>';
  }
  function summary(full) {
    const rows = ['<div class="prototype-summary__row"><span>Subtotal</span><span class="prototype-summary__amount">' + money(subtotal()) + '</span></div>'];
    if (state.promo) rows.push('<div class="prototype-summary__row prototype-summary__row--discount"><span>Promo FARO5</span><span class="prototype-summary__amount">−' + money(discount()) + '</span></div>');
    rows.push('<div class="prototype-summary__row"><span>Service fee (10%) <span aria-label="Calculated after discounts">ⓘ</span></span><span class="prototype-summary__amount">' + money(serviceFee()) + '</span></div>');
    if (full) rows.push('<div class="prototype-summary__row prototype-summary__row--total"><strong>Estimated total</strong><strong class="prototype-summary__amount">' + money(total()) + '</strong></div>');
    return '<div class="prototype-summary" aria-label="Itemized price breakdown">' + rows.join('') + '</div>';
  }
  function renderCart() {
    const host = $('#cart-content');
    if (state.promo && subtotal() < PROMO_AMOUNT) {
      state.promo = false;
      state.promoStatus = 'error';
      state.promoMessage = 'FARO5 applies to orders of $5.00 or more.';
    }
    if (!state.cart.length) { host.innerHTML = '<div class="prototype-empty rail-card"><span class="prototype-empty__icon" aria-hidden="true">▱</span><h2 class="type-heading">Your cart is empty</h2><p class="type-caption">Add an item from the menu to get started.</p><button class="rail-button rail-button--primary" type="button" data-action="menu">Browse menu</button></div>'; return; }
    const lines = state.cart.map((line) => { const item = itemFor(line.id); return '<article class="prototype-cart-item"><div><h2 class="type-label prototype-cart-item__name">' + item.name + '</h2><span class="type-caption prototype-cart-item__meta">' + money(item.price) + ' each</span></div><span class="type-mono prototype-cart-item__price">' + money(item.price * line.qty) + '</span><div class="prototype-cart-item__controls"><div class="rail-stepper ' + (line.qty === 1 ? 'rail-stepper--min-reached' : '') + '"><button class="rail-stepper__button rail-stepper__button--decrement" type="button" aria-label="Decrease quantity of ' + item.name + '" data-decrease="' + item.id + '" ' + (line.qty === 1 ? 'disabled' : '') + '>−</button><span class="rail-stepper__value" aria-live="polite">' + line.qty + '</span><button class="rail-stepper__button rail-stepper__button--increment" type="button" aria-label="Increase quantity of ' + item.name + '" data-increase="' + item.id + '">+</button></div><button class="rail-button rail-button--tertiary prototype-remove" type="button" data-remove="' + item.id + '">Remove</button></div></article>'; }).join('');
    const promoInputState = state.promo ? 'rail-input--success' : (state.promoStatus === 'error' ? 'rail-input--error' : '');
    const promoHelperState = state.promo ? 'rail-input__helper--success' : (state.promoStatus === 'error' ? 'rail-input__helper--error' : '');
    const promoHelper = state.promoMessage || 'Apply before checkout to see your savings.';
    host.innerHTML = '<div class="prototype-cart-list" role="list">' + lines + '</div><div class="prototype-promo"><div class="rail-input ' + promoInputState + '"><label class="rail-input__label" for="promo-code">Discount code</label><input class="rail-input__field" id="promo-code" type="text" value="' + escapeText(state.promo ? 'FARO5' : state.promoCode) + '" placeholder="Try FARO5" aria-invalid="' + (state.promoStatus === 'error') + '" aria-describedby="promo-helper" ' + (state.promo ? 'readonly' : '') + '><span class="rail-input__helper ' + promoHelperState + '" id="promo-helper">' + escapeText(promoHelper) + '</span></div><button class="rail-button rail-button--secondary" type="button" data-promo>' + (state.promo ? 'Applied' : 'Apply') + '</button></div>' + summary(true);
  }
  function renderCheckout() {
    if (state.order) { $('#checkout-content').innerHTML = '<div class="prototype-confirmation"><div class="rail-card"><span class="rail-badge rail-badge--label rail-badge--success">Order confirmed</span><h2 class="type-display prototype-confirmation__number">#' + state.order + '</h2><p class="type-body">Riverbend Grill is preparing your order now.</p><p class="type-caption">Pickup in about 15 minutes.</p></div><button class="rail-button rail-button--secondary rail-button--full-width" type="button" data-action="menu">Start a new order</button></div>'; return; }
    $('#checkout-content').innerHTML = '<div class="prototype-checkout-grid"><div class="stack stack--md"><div class="prototype-location"><span class="prototype-location__pin">●</span><div><strong class="type-label">Riverbend Grill</strong><p class="type-caption">Pickup in ~15 min</p></div></div><div class="rail-card"><div class="rail-card__body"><h2 class="rail-card__title">Payment method</h2><div class="prototype-payment"><button class="prototype-payment-option" type="button" role="radio" aria-checked="' + (state.payment === 'card') + '" data-payment="card"><span class="prototype-payment-option__copy"><strong class="type-label">Card ending in 4242</strong><span class="type-caption">Ready for simulated checkout</span></span><span class="prototype-payment-option__mark">' + (state.payment === 'card' ? '✓' : '') + '</span></button><button class="prototype-payment-option" type="button" role="radio" aria-checked="' + (state.payment === 'cash') + '" data-payment="cash"><span class="prototype-payment-option__copy"><strong class="type-label">Cash at pickup</strong><span class="type-caption">Pay at the restaurant</span></span><span class="prototype-payment-option__mark">' + (state.payment === 'cash' ? '✓' : '') + '</span></button></div></div></div></div><div>' + summary(true) + '<p class="type-caption" style="margin-top: var(--space-stack-sm); color: var(--text-secondary);">No surprise charges. The service fee is calculated from the discounted subtotal.</p></div></div>';
  }
  function renderSticky() {
    const host = $('#sticky-bar');
    if (state.order) { host.hidden = true; return; }
    host.hidden = false;
    if (state.view === 'menu') host.innerHTML = '<div class="prototype-sticky-bar__summary"><span class="type-body">' + count() + ' ' + (count() === 1 ? 'item' : 'items') + '</span><strong>' + money(total()) + '</strong></div><button class="rail-button rail-button--primary rail-button--full-width" type="button" data-action="cart" ' + (!state.cart.length ? 'disabled' : '') + '>View cart</button>';
    if (state.view === 'cart') host.innerHTML = '<div class="prototype-sticky-bar__summary"><span class="type-body">Estimated total</span><strong>' + money(total()) + '</strong></div><button class="rail-button rail-button--primary rail-button--full-width" type="button" data-action="checkout" ' + (!state.cart.length ? 'disabled' : '') + '>Continue to checkout</button>';
    if (state.view === 'checkout') host.innerHTML = '<div class="prototype-sticky-bar__summary"><span class="type-body">Pay today</span><strong>' + money(total()) + '</strong></div><button class="rail-button rail-button--primary rail-button--full-width" type="button" data-place-order>▣ Pay ' + money(total()) + '</button>';
  }
  function render() {
    $('#header-count').textContent = String(count());
    $('#menu-view').hidden = state.view !== 'menu'; $('#cart-view').hidden = state.view !== 'cart'; $('#checkout-view').hidden = state.view !== 'checkout';
    renderStatus(); renderMenu(); renderCart(); renderCheckout(); renderSticky();
  }
  function navigate(view) { if (view === 'checkout' && !state.cart.length) return; state.view = view; render(); window.scrollTo(0, 0); }
  document.addEventListener('click', (event) => {
    const target = event.target.closest('button'); if (!target) return;
    if (target.dataset.state) { setMode(target.dataset.state); return; }
    if (target.dataset.nav) {
      closeNavigation();
      if (target.dataset.nav === 'menu') navigate('menu');
      else toast(target.textContent + ' will be available in the full account experience.', 'info');
      return;
    }
    if (target.dataset.action === 'open-nav') { openNavigation(); return; }
    if (target.dataset.action === 'close-nav') { closeNavigation(); return; }
    if (target.dataset.section) { state.section = target.dataset.section; render(); return; }
    if (target.dataset.add) { add(target.dataset.add); return; }
    if (target.dataset.increase) { changeQty(target.dataset.increase, 1); return; }
    if (target.dataset.decrease) { changeQty(target.dataset.decrease, -1); return; }
    if (target.dataset.remove) { remove(target.dataset.remove); return; }
    if (target.dataset.payment) { state.payment = target.dataset.payment; render(); return; }
    if (target.hasAttribute('data-promo')) {
      const value = $('#promo-code').value.trim().toUpperCase();
      state.promoCode = value;
      if (state.promo) {
        state.promoStatus = 'success';
        state.promoMessage = 'FARO5 is already applied to this order.';
      } else if (value !== 'FARO5') {
        state.promoStatus = 'error';
        state.promoMessage = value ? 'That code is not valid. Try FARO5.' : 'Enter a discount code to apply it.';
      } else if (subtotal() < PROMO_AMOUNT) {
        state.promoStatus = 'error';
        state.promoMessage = 'FARO5 applies to orders of $5.00 or more.';
      } else {
        state.promo = true;
        state.promoStatus = 'success';
        state.promoMessage = 'FARO5 applied: $5.00 off.';
      }
      render();
      return;
    }
    if (target.dataset.action) { if (target.dataset.action === 'menu') { state.order = null; navigate('menu'); } else navigate(target.dataset.action); return; }
    if (target.dataset.placeOrder) { if (state.mode === 'offline') { toast('Reconnect to place your order.', 'warning'); return; } target.classList.add('rail-button--loading'); target.disabled = true; target.innerHTML = '<span class="rail-button__spinner" aria-hidden="true"></span> Processing'; window.setTimeout(() => { state.order = String(1000 + Math.floor(Math.random() * 8999)); render(); }, 700); }
  });
  $('#nav-backdrop').addEventListener('click', closeNavigation);
  $('#account-nav').addEventListener('close', () => {
    $('#nav-backdrop').hidden = true;
    $('.prototype-header__menu').setAttribute('aria-expanded', 'false');
  });
  window.addEventListener('online', () => { if (state.mode === 'offline') setMode('ready'); });
  window.addEventListener('offline', () => setMode('offline'));
  render();
})();