<script>
export default {
  name: 'InputQuantity',
  functional: true,
  props: {
    quantity: {
      type: Number,
      required: true
    }
  },
  render(h, { props, listeners }) {
    return (
      <div class="quantity-input-wrapper">
        <button class="quantity-btn" onClick={listeners.decreaseQuantity}>
          &#8722;
        </button>
        <span class="quantity-display">{props.quantity}</span>
        <button class="quantity-btn" onClick={listeners.increaseQuantity}>
          &#43;
        </button>
      </div>
    )
  }
}
</script>

<style scoped>
.quantity-input-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  min-width: 115px;
  height: 30px;
  border: 1px solid #eff3f6;
  border-radius: 5px;
}

.quantity-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border: none;
  font-size: 12px;
}

.quantity-btn {
  height: 100%;
  width: 40px;
  background: #eff3f6;
  color: var(--primary-color);
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.quantity-btn:hover {
  background: #e0e4e7;
}
</style>
