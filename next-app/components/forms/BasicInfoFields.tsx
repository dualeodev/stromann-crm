export default function BasicInfoFields() {
  return (
    <>
      <div className="form-grid-2">
        <div className="form-row">
          <label>Họ tên <span className="req">*</span></label>
          <input className="input" name="full_name" placeholder="Nguyễn Văn A" required />
        </div>
        <div className="form-row">
          <label>Công ty <span className="req">*</span></label>
          <input className="input" name="company" placeholder="Công ty TNHH ABC" required />
        </div>
      </div>
      <div className="form-grid-2">
        <div className="form-row">
          <label>Email <span className="req">*</span></label>
          <input className="input" name="email" type="email" placeholder="email@domain.com" required />
        </div>
        <div className="form-row">
          <label>SĐT <span className="req">*</span></label>
          <input className="input" name="phone" placeholder="09xx xxx xxx" required />
        </div>
      </div>
      <div className="form-row">
        <label>Địa chỉ giao hàng</label>
        <input className="input" name="address" placeholder="Số nhà / đường / quận / TP" />
      </div>
    </>
  );
}
