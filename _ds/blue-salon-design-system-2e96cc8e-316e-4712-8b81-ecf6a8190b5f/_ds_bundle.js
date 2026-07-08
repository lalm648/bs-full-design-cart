/* @ds-bundle: {"format":3,"namespace":"BlueSalonDesignSystem_2e96cc","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Breadcrumb","sourcePath":"components/core/Breadcrumb.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"PriceTag","sourcePath":"components/core/PriceTag.jsx"},{"name":"ProductCard","sourcePath":"components/core/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/core/QuantityStepper.jsx"},{"name":"Rating","sourcePath":"components/core/Rating.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a82e83c06a76","components/core/Breadcrumb.jsx":"bd9a84d3c165","components/core/Button.jsx":"3af442e945a9","components/core/IconButton.jsx":"dad0f23cfb23","components/core/Input.jsx":"b932a2b9d2fb","components/core/PriceTag.jsx":"d8cf0a13b699","components/core/ProductCard.jsx":"dadd45f66520","components/core/QuantityStepper.jsx":"6ecfabdfe161","components/core/Rating.jsx":"47a69605c40f","components/core/Tag.jsx":"a1663134ca46","ui_kits/website/Footer.jsx":"259aed99cdf1","ui_kits/website/Header.jsx":"94a53a752f33","ui_kits/website/HomeMinimal.jsx":"8538e88d6ee6","ui_kits/website/HomeScreen.jsx":"8614d784cbe1","ui_kits/website/Icons.jsx":"592b70c45400","ui_kits/website/WomenScreen.jsx":"23f964283d44","ui_kits/website/data.js":"f7444a86f3ae","ui_kits/website/women-data.js":"c219fee09985"},"inlinedExternals":[],"unexposedExports":[{"name":"formatQAR","sourcePath":"components/core/PriceTag.jsx"}]} */

(() => {

const __ds_ns = (window.BlueSalonDesignSystem_2e96cc = window.BlueSalonDesignSystem_2e96cc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status label overlaid on product imagery or beside titles.
 * NEW, SALE, SOLD OUT, EXCLUSIVE, -30%.
 */
function Badge({
  children,
  tone = "neutral",
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      background: "var(--ink-900)",
      color: "#fff"
    },
    sale: {
      background: "var(--sale)",
      color: "#fff"
    },
    new: {
      background: "var(--color-primary)",
      color: "#fff"
    },
    gold: {
      background: "var(--gold-500)",
      color: "#fff"
    },
    soldout: {
      background: "rgba(14,23,34,0.55)",
      color: "#fff"
    },
    outline: {
      background: "transparent",
      color: "var(--ink-900)",
      border: "1px solid var(--ink-900)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: "22px",
      padding: "0 9px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-xs)",
      whiteSpace: "nowrap",
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Breadcrumb trail — Home / Women / Bags / … */
function Breadcrumb({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Breadcrumb",
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "8px",
      ...style
    }
  }, rest), items.map((item, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px"
      }
    }, last || !item.href ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        letterSpacing: "var(--ls-wide)",
        textTransform: "uppercase",
        color: last ? "var(--text-strong)" : "var(--text-muted)",
        fontWeight: last ? "var(--fw-medium)" : "var(--fw-regular)"
      }
    }, item.label) : /*#__PURE__*/React.createElement("a", {
      href: item.href,
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        letterSpacing: "var(--ls-wide)",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        textDecoration: "none"
      }
    }, item.label), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ink-300)",
        lineHeight: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "m9 6 6 6-6 6"
    }))));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Salon primary action button.
 * Editorial, near-square corners, wide-tracked uppercase label.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const heights = {
    sm: "var(--control-sm)",
    md: "var(--control-md)",
    lg: "var(--control-lg)"
  };
  const pads = {
    sm: "0 18px",
    md: "0 26px",
    lg: "0 34px"
  };
  const fontSizes = {
    sm: "11px",
    md: "12px",
    lg: "13px"
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    height: heights[size],
    padding: pads[size],
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontSize: fontSizes[size],
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "var(--ls-wider)",
    textTransform: "uppercase",
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent",
    transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
    transform: active && !disabled ? "scale(0.98)" : "scale(1)",
    opacity: disabled ? 0.45 : 1,
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: hover ? "var(--color-primary-hover)" : "var(--color-primary)",
      color: "var(--text-on-primary)"
    },
    secondary: {
      background: hover ? "var(--ink-900)" : "transparent",
      color: hover ? "#fff" : "var(--ink-900)",
      borderColor: "var(--ink-900)"
    },
    ghost: {
      background: hover ? "var(--surface-hover)" : "transparent",
      color: "var(--color-primary)"
    },
    gold: {
      background: hover ? "var(--gold-600)" : "var(--gold-500)",
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square or circular icon-only button — top-bar utilities (search, wishlist, bag),
 * card overlays (quick view, wishlist). Pass a 18–22px SVG / icon element as children.
 */
function IconButton({
  children,
  label,
  variant = "plain",
  shape = "circle",
  size = 40,
  active = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    plain: {
      background: hover ? "var(--surface-hover)" : "transparent",
      color: active ? "var(--color-primary)" : "var(--ink-800)",
      border: "1px solid transparent"
    },
    outline: {
      background: hover ? "var(--ink-900)" : "var(--paper)",
      color: hover ? "#fff" : "var(--ink-900)",
      border: "1px solid var(--border-default)"
    },
    solid: {
      background: hover ? "var(--color-primary-hover)" : "var(--color-primary)",
      color: "#fff",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      flex: "none",
      borderRadius: shape === "circle" ? "var(--radius-circle)" : "var(--radius-sm)",
      cursor: "pointer",
      transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional label, hint and error. Hairline border, cyan focus ring.
 */
function Input({
  label,
  hint,
  error,
  size = "md",
  type = "text",
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const inputId = id || reactId;
  const heights = {
    sm: "var(--control-sm)",
    md: "var(--control-md)",
    lg: "var(--control-lg)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: "100%"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-wider)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: heights[size],
      padding: "0 14px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-md)",
      color: "var(--text-strong)",
      background: "var(--paper)",
      border: `1px solid ${error ? "var(--danger)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-sm)",
      outline: "none",
      boxShadow: focus && !error ? "var(--shadow-focus)" : "none",
      transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: error ? "var(--danger)" : "var(--text-subtle)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Format a number as Blue Salon currency: QAR 5,780.00 */
function formatQAR(amount, currency = "QAR") {
  return `${currency} ${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Price display. Shows a struck-through original beside a red sale price when
 * `compareAt` is provided. Prices are set in the Bodoni display face.
 */
function PriceTag({
  price,
  compareAt,
  currency = "QAR",
  size = "md",
  style,
  ...rest
}) {
  const onSale = compareAt != null && compareAt > price;
  const sizes = {
    sm: "14px",
    md: "18px",
    lg: "26px"
  };
  const fs = sizes[size];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: "10px",
      fontFamily: "var(--font-display)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: fs,
      fontWeight: "var(--fw-medium)",
      color: onSale ? "var(--price-sale)" : "var(--price-regular)",
      letterSpacing: "var(--ls-tight)"
    }
  }, formatQAR(price, currency)), onSale && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: `calc(${fs} * 0.72)`,
      color: "var(--text-subtle)",
      textDecoration: "line-through",
      fontWeight: "var(--fw-regular)"
    }
  }, formatQAR(compareAt, currency)));
}
Object.assign(__ds_scope, { formatQAR, PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/core/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Salon product card — the storefront's core merchandising unit.
 * Image on white with hover cross-fade to a second shot, wishlist overlay,
 * vendor eyebrow, product name, price. Border-defined; lifts on hover.
 */
function ProductCard({
  image,
  imageAlt = "",
  hoverImage,
  vendor,
  name,
  price,
  compareAt,
  badge,
  badgeTone = "neutral",
  soldOut = false,
  wishlisted = false,
  onWishlist,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Heart = /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: wishlisted ? "var(--sale)" : "none",
    stroke: wishlisted ? "var(--sale)" : "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
  }));
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick,
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      cursor: onClick ? "pointer" : "default",
      transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
      boxShadow: hover ? "var(--shadow-md)" : "none",
      transform: hover ? "translateY(-3px)" : "translateY(0)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "3 / 4",
      background: "var(--paper)",
      overflow: "hidden"
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "opacity var(--dur-slow) var(--ease-standard)",
      opacity: hover && hoverImage ? 0 : 1
    }
  }), hoverImage && /*#__PURE__*/React.createElement("img", {
    src: hoverImage,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "opacity var(--dur-slow) var(--ease-standard)",
      opacity: hover ? 1 : 0
    }
  }), (badge || soldOut) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: soldOut ? "soldout" : badgeTone
  }, soldOut ? "Sold out" : badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 8,
      right: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: wishlisted ? "Remove from wishlist" : "Add to wishlist",
    active: wishlisted,
    onClick: e => {
      e.stopPropagation();
      if (onWishlist) onWishlist(e);
    },
    style: {
      background: "rgba(255,255,255,0.86)",
      backdropFilter: "blur(2px)"
    }
  }, Heart))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 16px 18px",
      display: "flex",
      flexDirection: "column",
      gap: "7px"
    }
  }, vendor && /*#__PURE__*/React.createElement("span", {
    className: "bs-eyebrow",
    style: {
      color: "var(--color-primary)"
    }
  }, vendor), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      lineHeight: "var(--lh-snug)",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      minHeight: "calc(var(--text-sm) * var(--lh-snug) * 2)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "2px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price,
    compareAt: compareAt,
    size: "sm"
  }))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Quantity stepper for cart / bag lines. */
function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  style,
  ...rest
}) {
  const h = size === "sm" ? 34 : 44;
  const set = v => {
    const n = Math.max(min, Math.min(max, v));
    if (onChange) onChange(n);
  };
  const btn = (label, onClick, disabled) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    style: {
      width: h,
      height: h,
      border: 0,
      background: "transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      color: disabled ? "var(--text-disabled)" : "var(--ink-800)",
      fontSize: "18px",
      lineHeight: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, label === "Decrease" ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-sm)",
      background: "var(--paper)",
      ...style
    }
  }, rest), btn("Decrease", () => set(value - 1), value <= min), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: h - 8,
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-md)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)"
    }
  }, value), btn("Increase", () => set(value + 1), value >= max));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/core/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Read-only star rating with optional review count. */
function Rating({
  value = 0,
  count,
  size = 14,
  style,
  ...rest
}) {
  const stars = [0, 1, 2, 3, 4];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "2px"
    }
  }, stars.map(i => {
    const fill = Math.max(0, Math.min(1, value - i));
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: "relative",
        width: size,
        height: size,
        lineHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: "var(--ink-200)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: 0,
        width: `${fill * 100}%`,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: "var(--gold-500)"
    })));
  })), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: "var(--text-subtle)"
    }
  }, "(", count, ")"));
}
function Star({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    stroke: "none",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.8 6.2 20.8l1.1-6.4L2.6 9.8l6.5-.9z"
  }));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Rating.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Selectable / removable chip — filter facets, size & colour selectors.
 * Pill shape for filters; square for size swatches when `swatch` is set.
 */
function Tag({
  children,
  selected = false,
  swatch = false,
  disabled = false,
  onClick,
  onRemove,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick || !!onRemove;
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      minHeight: swatch ? "40px" : "34px",
      minWidth: swatch ? "44px" : "auto",
      justifyContent: "center",
      padding: swatch ? "0 12px" : "0 14px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: swatch ? "var(--ls-wide)" : "var(--ls-normal)",
      color: disabled ? "var(--text-disabled)" : selected ? "var(--text-on-primary)" : "var(--text-body)",
      background: selected ? "var(--color-primary)" : hover && interactive ? "var(--surface-hover)" : "var(--paper)",
      border: `1px solid ${selected ? "var(--color-primary)" : "var(--border-default)"}`,
      borderRadius: swatch ? "var(--radius-sm)" : "var(--radius-pill)",
      cursor: disabled ? "not-allowed" : interactive ? "pointer" : "default",
      textDecoration: disabled ? "line-through" : "none",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      padding: 0,
      display: "inline-flex",
      color: "currentColor",
      opacity: 0.7,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* Blue Salon storefront footer. */
(function () {
  const I = window.BSIcons;
  const cols = [{
    h: "Customer Care",
    links: ["Track your order", "Shipping & delivery", "Returns & exchanges", "Contact us", "FAQ"]
  }, {
    h: "About Blue Salon",
    links: ["Our story", "Boutiques in Qatar", "Careers", "Press", "Sustainability"]
  }, {
    h: "Shop",
    links: ["Women", "Men", "Beauty", "Watches & Jewellery", "Gourmet", "Gift cards"]
  }];
  const services = [["Truck", "Complimentary delivery", "On orders over QAR 499 across Qatar"], ["Return", "Easy returns", "14-day returns on eligible items"], ["Shield", "100% authentic", "Sourced directly from the maisons"]];
  function Footer({
    bg = "var(--blue-800)"
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: bg,
        color: "#fff",
        marginTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderBottom: "1px solid rgba(255,255,255,0.14)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "26px 24px",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 24
      }
    }, services.map(([icon, t, s]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: "flex",
        gap: 14,
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--blue-300)"
      }
    }, React.createElement(I[icon], {
      size: 26
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "var(--ls-wide)",
        textTransform: "uppercase"
      }
    }, t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "rgba(255,255,255,0.7)"
      }
    }, s)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "48px 24px",
        display: "grid",
        gridTemplateColumns: "1.2fr repeat(3, 1fr)",
        gap: 40
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-horizontal-white.svg",
      alt: "Blue Salon",
      style: {
        height: 34,
        marginBottom: 18
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.72)",
        maxWidth: 260,
        margin: 0
      }
    }, "Qatar's first and foremost luxury department store since 1981. Over 500 international and niche brands, curated for you.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.h
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: 11.5,
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        color: "var(--blue-300)",
        marginBottom: 16
      }
    }, c.h), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 11
      }
    }, c.links.map(l => /*#__PURE__*/React.createElement("li", {
      key: l
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        fontSize: 13.5,
        color: "rgba(255,255,255,0.82)",
        textDecoration: "none"
      }
    }, l))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid rgba(255,255,255,0.14)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "rgba(255,255,255,0.6)"
      }
    }, "\xA9 2026 Blue Salon \xB7 AbuIssa Holding \xB7 Doha, Qatar"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        letterSpacing: "var(--ls-wide)",
        color: "rgba(255,255,255,0.6)"
      }
    }, "VISA \xB7 MASTERCARD \xB7 APPLE PAY \xB7 TABBY"))));
  }
  window.Footer = Footer;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* Blue Salon storefront header — announcement bar, logo, utilities, nav. */
(function () {
  const {
    IconButton
  } = window.BlueSalonDesignSystem_2e96cc;
  const I = window.BSIcons;
  function Header({
    nav,
    cartCount,
    wishCount,
    onNavigate,
    active,
    barColor = "var(--blue-800)"
  }) {
    const [q, setQ] = React.useState("");
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--paper)",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: barColor,
        color: "#fff",
        textAlign: "center",
        fontSize: "11px",
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        padding: "8px 16px",
        fontWeight: 500
      }
    }, "Complimentary shipping on orders over QAR 499 \xA0\xB7\xA0 Split your payment into 4 installments"), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px",
        height: 76,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        maxWidth: 300
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ink-600)"
      }
    }, /*#__PURE__*/React.createElement(I.Search, null)), /*#__PURE__*/React.createElement("input", {
      value: q,
      onChange: e => setQ(e.target.value),
      placeholder: "Search 500+ luxury brands",
      style: {
        border: 0,
        outline: "none",
        background: "transparent",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        color: "var(--text-strong)",
        width: "100%"
      }
    })), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate("home");
      },
      style: {
        justifySelf: "center"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-horizontal.svg",
      alt: "Blue Salon",
      style: {
        height: 38
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Store locator"
    }, /*#__PURE__*/React.createElement(I.Pin, null)), /*#__PURE__*/React.createElement(IconButton, {
      label: "Account"
    }, /*#__PURE__*/React.createElement(I.User, null)), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Wishlist"
    }, /*#__PURE__*/React.createElement(I.Heart, null)), wishCount > 0 && /*#__PURE__*/React.createElement(Count, {
      n: wishCount
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Bag",
      onClick: () => onNavigate("cart")
    }, /*#__PURE__*/React.createElement(I.Bag, null)), cartCount > 0 && /*#__PURE__*/React.createElement(Count, {
      n: cartCount
    })))), /*#__PURE__*/React.createElement("nav", {
      style: {
        borderTop: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("ul", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px",
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        gap: 34,
        height: 48,
        alignItems: "center"
      }
    }, nav.map(item => {
      const isActive = active === "listing" && item === "Women";
      return /*#__PURE__*/React.createElement("li", {
        key: item
      }, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: e => {
          e.preventDefault();
          onNavigate(item === "Women" ? "listing" : "listing");
        },
        style: {
          fontFamily: "var(--font-sans)",
          fontSize: 12.5,
          letterSpacing: "var(--ls-wider)",
          textTransform: "uppercase",
          color: isActive ? "var(--color-primary)" : "var(--ink-800)",
          fontWeight: isActive ? 600 : 500,
          textDecoration: "none",
          borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
          paddingBottom: 14,
          paddingTop: 14,
          whiteSpace: "nowrap"
        }
      }, item));
    }))));
  }
  function Count({
    n
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 2,
        right: 2,
        minWidth: 17,
        height: 17,
        padding: "0 4px",
        background: "var(--sale)",
        color: "#fff",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-sans)"
      }
    }, n);
  }
  window.Header = Header;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeMinimal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Home (Minimal) — quiet luxury: split hero, text categories, curated grid, calm invitation. */
(function () {
  const {
    ProductCard,
    Button
  } = window.BlueSalonDesignSystem_2e96cc;
  const MAX = "var(--container-max)";
  function HomeMinimal({
    data,
    onProduct,
    onListing,
    wishlist,
    toggleWish
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "var(--space-12) 24px var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 72,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "bs-eyebrow",
      style: {
        color: "var(--color-primary)"
      }
    }, "The Spring Edit"), /*#__PURE__*/React.createElement("h1", {
      className: "bs-display",
      style: {
        fontSize: 58,
        lineHeight: 1.04,
        margin: "20px 0 0",
        maxWidth: 520
      }
    }, "The season\u2019s most coveted, curated for you."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 16,
        lineHeight: 1.75,
        color: "var(--text-muted)",
        maxWidth: 400,
        margin: "24px 0 32px"
      }
    }, "New arrivals from the world\u2019s defining maisons \u2014 discovered first at Blue Salon."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: onListing
    }, "Shop the edit"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      style: {
        fontSize: 12.5,
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--color-primary)"
      }
    }, "Discover brands \u2192"))), /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "4 / 5",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: data.hero,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "0 24px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "8px 44px",
        padding: "26px 0"
      }
    }, data.categories.map(c => /*#__PURE__*/React.createElement("a", {
      key: c.label,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      className: "bs-cat-link",
      style: {
        fontSize: 13,
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        fontWeight: 500,
        color: "var(--ink-800)"
      }
    }, c.label)))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "var(--space-12) 24px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 36
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "bs-eyebrow",
      style: {
        color: "var(--color-primary)"
      }
    }, "New this week"), /*#__PURE__*/React.createElement("h2", {
      className: "bs-display",
      style: {
        fontSize: 34,
        marginTop: 10
      }
    }, "Quietly remarkable")), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      style: {
        fontSize: 12,
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--color-primary)"
      }
    }, "View all \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20
      }
    }, data.products.slice(0, 4).map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
      key: p.id
    }, p, {
      hoverImage: p.hover,
      wishlisted: wishlist.includes(p.id),
      onWishlist: () => toggleWish(p.id),
      onClick: () => onProduct(p.id)
    }))))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--color-primary)",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 720,
        margin: "0 auto",
        padding: "var(--space-12) 24px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "bs-eyebrow",
      style: {
        color: "var(--blue-300)"
      }
    }, "Private Client"), /*#__PURE__*/React.createElement("h2", {
      className: "bs-display",
      style: {
        color: "#fff",
        fontSize: 40,
        lineHeight: 1.08,
        margin: "18px 0 18px"
      }
    }, "A personal service, by appointment."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15.5,
        lineHeight: 1.75,
        color: "rgba(255,255,255,0.82)",
        maxWidth: 460,
        margin: "0 auto 30px"
      }
    }, "Our stylists curate edits for you across fashion, watches and home \u2014 in boutique or to your door anywhere in Doha."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      style: {
        color: "#fff",
        borderColor: "rgba(255,255,255,0.7)"
      }
    }, "Request an appointment"))));
  }
  window.HomeMinimal = HomeMinimal;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeMinimal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Home — hero, categories, Trending Now, editorial banner. */
(function () {
  const {
    ProductCard,
    Button
  } = window.BlueSalonDesignSystem_2e96cc;
  function HomeScreen({
    data,
    onProduct,
    onListing,
    wishlist,
    toggleWish
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        height: 560,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: data.hero,
      alt: "",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(0,42,87,0.55) 0%, rgba(0,42,87,0.12) 55%, rgba(0,42,87,0) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        letterSpacing: "var(--ls-widest)",
        textTransform: "uppercase",
        fontWeight: 500,
        marginBottom: 18
      }
    }, "The Spring Edit"), /*#__PURE__*/React.createElement("h1", {
      className: "bs-display",
      style: {
        color: "#fff",
        fontSize: 64,
        maxWidth: 620,
        lineHeight: 1.02
      }
    }, "The season's most coveted, curated for you."), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 440,
        fontSize: 16,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.9)",
        margin: "20px 0 28px"
      }
    }, "New arrivals from the world's defining maisons \u2014 discovered first at Blue Salon."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: onListing
    }, "Shop the edit"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onListing,
      style: {
        color: "#fff",
        borderColor: "#fff"
      }
    }, "Discover brands")))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "var(--space-12) 24px var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      eyebrow: "Shop by category",
      title: "Explore the house"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 16,
        marginTop: 36
      }
    }, data.categories.map(c => /*#__PURE__*/React.createElement("a", {
      key: c.label,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      style: {
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        aspectRatio: "3/4",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: c.img,
      alt: c.label,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, transparent 40%, rgba(0,42,87,0.6) 100%)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 14,
        textAlign: "center",
        color: "#fff",
        fontSize: 12.5,
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        fontWeight: 600
      }
    }, c.label)))))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      eyebrow: "Trending now",
      title: "The most wanted"
    }), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      style: {
        fontSize: 12,
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--color-primary)"
      }
    }, "View all \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        marginTop: 36
      }
    }, data.products.slice(0, 4).map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
      key: p.id
    }, p, {
      hoverImage: p.hover,
      wishlisted: wishlist.includes(p.id),
      onWishlist: () => toggleWish(p.id),
      onClick: () => onProduct(p.id)
    }))))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--surface-panel)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "var(--space-12) 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "bs-eyebrow",
      style: {
        color: "var(--gold-600)"
      }
    }, "Private Client"), /*#__PURE__*/React.createElement("hr", {
      className: "bs-rule-gold",
      style: {
        margin: "16px 0 22px"
      }
    }), /*#__PURE__*/React.createElement("h2", {
      className: "bs-display",
      style: {
        fontSize: 44,
        lineHeight: 1.05,
        marginBottom: 18
      }
    }, "A personal service, by appointment."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15.5,
        lineHeight: 1.75,
        color: "var(--text-muted)",
        maxWidth: 420,
        marginBottom: 26
      }
    }, "Our stylists curate edits for you across fashion, watches and home \u2014 in boutique or to your door anywhere in Doha."), /*#__PURE__*/React.createElement(Button, {
      variant: "gold"
    }, "Request an appointment")), /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "4/3",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })))));
  }
  function Heading({
    eyebrow,
    title
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "bs-eyebrow"
    }, eyebrow), /*#__PURE__*/React.createElement("h2", {
      className: "bs-display",
      style: {
        fontSize: 34,
        marginTop: 8
      }
    }, title));
  }
  window.HomeScreen = HomeScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Icons.jsx
try { (() => {
/* Thin line icons (Lucide-style, stroke 1.6) shared across the website kit. */
window.BSIcons = function () {
  const S = (children, w = 20) => (props = {}) => React.createElement("svg", {
    width: props.size || w,
    height: props.size || w,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  }, children);
  const p = d => React.createElement("path", {
    key: d,
    d
  });
  return {
    Search: S([p("m21 21-4.3-4.3"), React.createElement("circle", {
      key: "c",
      cx: 11,
      cy: 11,
      r: 7
    })]),
    User: S([React.createElement("circle", {
      key: "c",
      cx: 12,
      cy: 8,
      r: 4
    }), p("M4 21a8 8 0 0 1 16 0")]),
    Heart: S([p("M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l9 9 8.8-8.6a5.5 5.5 0 0 0-.2-7.8z")]),
    Bag: S([p("M6 7h12l1 13H5z"), p("M9 7a3 3 0 0 1 6 0")]),
    Pin: S([p("M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"), React.createElement("circle", {
      key: "c",
      cx: 12,
      cy: 10,
      r: 3
    })]),
    Menu: S([p("M3 6h18"), p("M3 12h18"), p("M3 18h18")]),
    ChevR: S([p("m9 6 6 6-6 6")]),
    ChevD: S([p("m6 9 6 6 6-6")]),
    Close: S([p("M18 6 6 18"), p("M6 6l12 12")]),
    Filter: S([p("M3 5h18"), p("M6 12h12"), p("M10 19h4")]),
    Truck: S([p("M3 7h11v8H3zM14 10h4l3 3v2h-7z"), React.createElement("circle", {
      key: "a",
      cx: 7,
      cy: 18,
      r: 1.6
    }), React.createElement("circle", {
      key: "b",
      cx: 18,
      cy: 18,
      r: 1.6
    })]),
    Shield: S([p("M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z")]),
    Return: S([p("M3 9l4-4 4 4"), p("M7 5v8a4 4 0 0 0 4 4h9")]),
    Star: (props = {}) => React.createElement("svg", {
      width: props.size || 16,
      height: props.size || 16,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      ...props
    }, React.createElement("path", {
      d: "M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.8 6.2 20.8l1.1-6.4L2.6 9.8l6.5-.9z"
    }))
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WomenScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Women — department landing: hero, category links, New In, edits, designers, trending, banner. */
(function () {
  const {
    ProductCard,
    Button
  } = window.BlueSalonDesignSystem_2e96cc;
  const MAX = "var(--container-max)";
  function Eyebrow({
    children,
    gold
  }) {
    return /*#__PURE__*/React.createElement("span", {
      className: "bs-eyebrow",
      style: gold ? {
        color: "var(--gold-600)"
      } : null
    }, children);
  }
  function SectionHead({
    eyebrow,
    title,
    link,
    onLink
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h2", {
      className: "bs-display",
      style: {
        fontSize: 34,
        marginTop: 8
      }
    }, title)), link && /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onLink && onLink();
      },
      style: {
        fontSize: 12,
        letterSpacing: "var(--ls-wider)",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--color-primary)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        paddingBottom: 6
      }
    }, link, " \u2192"));
  }
  function Rail({
    items,
    wishlist,
    toggleWish,
    onProduct
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        marginTop: 36
      }
    }, items.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
      key: p.id
    }, p, {
      hoverImage: p.hover,
      wishlisted: wishlist.includes(p.id),
      onWishlist: () => toggleWish(p.id),
      onClick: () => onProduct(p.id)
    }))));
  }
  function WomenScreen({
    data,
    onProduct,
    onListing,
    wishlist,
    toggleWish
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        height: 600,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: data.hero,
      alt: "",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center 30%"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(0,42,87,0.5) 0%, rgba(0,42,87,0.1) 50%, rgba(0,42,87,0) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: MAX,
        margin: "0 auto",
        padding: "0 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        letterSpacing: "var(--ls-widest)",
        textTransform: "uppercase",
        fontWeight: 500,
        marginBottom: 18
      }
    }, "Women \xB7 Spring/Summer 2026"), /*#__PURE__*/React.createElement("h1", {
      className: "bs-display",
      style: {
        color: "#fff",
        fontSize: 68,
        maxWidth: 640,
        lineHeight: 1.0
      }
    }, "The new season, in full bloom."), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 440,
        fontSize: 16,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.92)",
        margin: "20px 0 28px"
      }
    }, "The latest from the world's defining maisons \u2014 dresses, bags and jewellery, discovered first at Blue Salon."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: onListing
    }, "Shop new in"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onListing,
      style: {
        color: "#fff",
        borderColor: "#fff"
      }
    }, "Shop the sale")))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "var(--space-11) 24px var(--space-9)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 36
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Shop by category")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: 18
      }
    }, data.categories.map(c => /*#__PURE__*/React.createElement("a", {
      key: c.label,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      style: {
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: 999,
        overflow: "hidden",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: c.img,
      alt: c.label,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        letterSpacing: "var(--ls-wide)",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--ink-800)"
      }
    }, c.label))))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "0 24px var(--space-11)"
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      eyebrow: "Just arrived",
      title: "New in for her",
      link: "View all",
      onLink: onListing
    }), /*#__PURE__*/React.createElement(Rail, {
      items: data.newIn,
      wishlist: wishlist,
      toggleWish: toggleWish,
      onProduct: onProduct
    })), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "0 24px var(--space-11)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20
      }
    }, data.edits.map(ed => /*#__PURE__*/React.createElement("a", {
      key: ed.title,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      style: {
        position: "relative",
        display: "block",
        aspectRatio: "4/5",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: ed.img,
      alt: "",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,42,87,0) 45%, rgba(0,42,87,0.72) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 40,
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        letterSpacing: "var(--ls-widest)",
        textTransform: "uppercase",
        fontWeight: 600,
        opacity: 0.9
      }
    }, ed.eyebrow), /*#__PURE__*/React.createElement("h3", {
      className: "bs-display",
      style: {
        color: "#fff",
        fontSize: 40,
        lineHeight: 1.05,
        margin: "10px 0 8px"
      }
    }, ed.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.9)",
        maxWidth: 380,
        marginBottom: 20
      }
    }, ed.copy), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      style: {
        color: "#fff",
        borderColor: "#fff"
      }
    }, ed.cta)))))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--surface-panel)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "var(--space-11) 24px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "The houses"), /*#__PURE__*/React.createElement("h2", {
      className: "bs-display",
      style: {
        fontSize: 34,
        marginTop: 8,
        marginBottom: 40
      }
    }, "Top designers for her"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid var(--border-subtle)",
        borderLeft: "1px solid var(--border-subtle)"
      }
    }, data.designers.map(d => /*#__PURE__*/React.createElement("a", {
      key: d,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onListing();
      },
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 96,
        padding: "0 16px",
        borderRight: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        textDecoration: "none",
        color: "var(--ink-800)",
        fontSize: 18,
        letterSpacing: "0.02em",
        background: "var(--paper)"
      }
    }, d))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 40
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onListing
    }, "View all designers")))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "var(--space-11) 24px"
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      eyebrow: "Trending now",
      title: "The most wanted",
      link: "View all",
      onLink: onListing
    }), /*#__PURE__*/React.createElement(Rail, {
      items: data.trending,
      wishlist: wishlist,
      toggleWish: toggleWish,
      onProduct: onProduct
    })), /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        overflow: "hidden",
        background: "var(--blue-800)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: MAX,
        margin: "0 auto",
        padding: "var(--space-12) 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "bs-eyebrow",
      style: {
        color: "var(--gold-300)"
      }
    }, "Private Client"), /*#__PURE__*/React.createElement("hr", {
      className: "bs-rule-gold",
      style: {
        margin: "16px 0 22px"
      }
    }), /*#__PURE__*/React.createElement("h2", {
      className: "bs-display",
      style: {
        color: "#fff",
        fontSize: 46,
        lineHeight: 1.05,
        marginBottom: 18
      }
    }, "A wardrobe, styled for you."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15.5,
        lineHeight: 1.75,
        color: "rgba(255,255,255,0.82)",
        maxWidth: 440,
        marginBottom: 28
      }
    }, "Our personal stylists curate seasonal edits across womenswear, jewellery and beauty \u2014 in boutique or to your door anywhere in Doha."), /*#__PURE__*/React.createElement(Button, {
      variant: "gold"
    }, "Request an appointment")), /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "4/3",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })))));
  }
  window.WomenScreen = WomenScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WomenScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Blue Salon storefront sample data (fictional listings, real brand names).
window.BS_DATA = function () {
  const u = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
  const products = [{
    id: "mcm-backpack",
    vendor: "MCM",
    name: "Stark Side Studs Backpack in Visetos Cognac",
    price: 5780,
    image: u("photo-1584917865442-de89df76afd3"),
    hover: u("photo-1559563458-527698bf5295"),
    badge: "New",
    badgeTone: "new",
    cat: "Women",
    type: "Bags",
    rating: 4.5,
    count: 64,
    color: "Cognac",
    sizes: ["OS"]
  }, {
    id: "breitling-navitimer",
    vendor: "Breitling",
    name: "Navitimer Automatic 41 Steel Watch",
    price: 20930,
    compareAt: 29900,
    image: u("photo-1523275335684-37898b6baf30"),
    hover: u("photo-1547996160-81dfa63595aa"),
    badge: "-30%",
    badgeTone: "sale",
    cat: "Watches",
    type: "Watches",
    rating: 5,
    count: 38,
    color: "Steel",
    sizes: ["41mm"]
  }, {
    id: "creed-aventus",
    vendor: "Creed",
    name: "Aventus Eau de Parfum 100ml",
    price: 1490,
    image: u("photo-1541643600914-78b084683601"),
    hover: u("photo-1592945403244-b3fbafd7f539"),
    cat: "Beauty",
    type: "Fragrance",
    soldOut: true,
    rating: 4.8,
    count: 210,
    color: "—",
    sizes: ["100ml"]
  }, {
    id: "colehaan-oxford",
    vendor: "Cole Haan",
    name: "GrandPrø Leather Oxford Shoes",
    price: 890,
    image: u("photo-1549298916-b41d501d3772"),
    hover: u("photo-1614252369475-531eba835eb1"),
    badge: "Exclusive",
    badgeTone: "gold",
    cat: "Men",
    type: "Shoes",
    rating: 4.3,
    count: 51,
    color: "Tan",
    sizes: ["40", "41", "42", "43", "44"]
  }, {
    id: "leolin-dress",
    vendor: "Leo Lin",
    name: "Matilda Puff Sleeve Midi Dress — Twilight Print",
    price: 2990,
    image: u("photo-1572804013309-59a88b7e92f1"),
    hover: u("photo-1595777457583-95e059d581b8"),
    cat: "Women",
    type: "Dresses",
    rating: 4.6,
    count: 22,
    color: "Marine",
    sizes: ["6", "8", "10", "12"]
  }, {
    id: "missoni-dress",
    vendor: "Missoni Kids",
    name: "Girl's Zigzag Knit Dress Multicolor",
    price: 1850,
    image: u("photo-1518831959646-742c3a14ebf7"),
    hover: u("photo-1503944168849-8bf86875bbd8"),
    cat: "Kids",
    type: "Dresses",
    rating: 4.1,
    count: 12,
    color: "Multicolor",
    sizes: ["8", "10", "12"]
  }, {
    id: "rimowa-trunk",
    vendor: "Rimowa",
    name: "Original Cabin Aluminium Trolley",
    price: 6300,
    image: u("photo-1565026057447-bc90a3dceb87"),
    hover: u("photo-1553062407-98eeb64c6a62"),
    badge: "New",
    badgeTone: "new",
    cat: "Luggage",
    type: "Luggage",
    rating: 4.9,
    count: 73,
    color: "Silver",
    sizes: ["Cabin"]
  }, {
    id: "godiva-box",
    vendor: "Godiva",
    name: "Gold Collection Chocolate Gift Box, 24 pcs",
    price: 320,
    image: u("photo-1548907040-4baa42d10919"),
    hover: u("photo-1511381939415-e44015466834"),
    cat: "Gourmet",
    type: "Chocolate",
    rating: 4.7,
    count: 156,
    color: "—",
    sizes: ["24 pcs"]
  }];
  const categories = [{
    label: "Women",
    img: u("photo-1483985988355-763728e1935b")
  }, {
    label: "Men",
    img: u("photo-1516257984-b1b4d707412e")
  }, {
    label: "Beauty",
    img: u("photo-1522335789203-aabd1fc54bc9")
  }, {
    label: "Watches",
    img: u("photo-1524805444758-089113d48a6d")
  }, {
    label: "Luggage",
    img: u("photo-1565026057447-bc90a3dceb87")
  }, {
    label: "Gourmet",
    img: u("photo-1548907040-4baa42d10919")
  }];
  const nav = ["Women", "Men", "Kids", "Beauty", "Luggage", "Gourmet", "Home & Linen", "Gift"];
  return {
    products,
    categories,
    nav,
    hero: u("photo-1490481651871-ab68de25d43d")
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/women-data.js
try { (() => {
// Blue Salon — Women's department landing data (fictional listings, real brand names).
window.BS_WOMEN = function () {
  const u = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
  const w = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

  // New In rail
  const newIn = [{
    id: "leolin-matilda",
    vendor: "Leo Lin",
    name: "Matilda Puff Sleeve Midi Dress — Twilight Print",
    price: 2990,
    image: u("photo-1572804013309-59a88b7e92f1"),
    hover: u("photo-1595777457583-95e059d581b8"),
    badge: "New",
    badgeTone: "new"
  }, {
    id: "mcm-stark",
    vendor: "MCM",
    name: "Stark Side Studs Backpack in Visetos Cognac",
    price: 5780,
    image: u("photo-1584917865442-de89df76afd3"),
    hover: u("photo-1559563458-527698bf5295"),
    badge: "New",
    badgeTone: "new"
  }, {
    id: "aquazzura-bow",
    vendor: "Aquazzura",
    name: "Bow Tie 105 Suede Pumps in Powder Blush",
    price: 3150,
    image: u("photo-1543163521-1bf539c55dd2"),
    hover: u("photo-1518049362265-d5b2a6467637"),
    badge: "New",
    badgeTone: "new"
  }, {
    id: "chloe-fragrance",
    vendor: "Chloé",
    name: "Chloé Eau de Parfum Naturelle 100ml",
    price: 690,
    image: u("photo-1541643600914-78b084683601"),
    hover: u("photo-1592945403244-b3fbafd7f539")
  }];

  // Trending / most wanted
  const trending = [{
    id: "zimmermann-dress",
    vendor: "Zimmermann",
    name: "Halcyon Floral Linen Maxi Dress",
    price: 4280,
    image: u("photo-1496747611176-843222e1e57c"),
    hover: u("photo-1485968579580-b6d095142e6e"),
    badge: "Exclusive",
    badgeTone: "gold"
  }, {
    id: "jimmychoo-bon",
    vendor: "Jimmy Choo",
    name: "Bon Bon Bucket Bag in Patent Calf",
    price: 6900,
    image: u("photo-1566150905458-1bf1fc113f0d"),
    hover: u("photo-1591561954557-26941169b49e")
  }, {
    id: "selfportrait-lace",
    vendor: "Self-Portrait",
    name: "Guipure Lace Cocktail Mini Dress",
    price: 1980,
    compareAt: 2830,
    image: u("photo-1539008835657-9e8e9680c956"),
    hover: u("photo-1502716119720-b23a93e5fe1b"),
    badge: "-30%",
    badgeTone: "sale"
  }, {
    id: "bvlgari-serpenti",
    vendor: "Bvlgari",
    name: "Serpenti Viper 18kt Rose Gold Bracelet",
    price: 18400,
    image: u("photo-1515562141207-7a88fb7ce338"),
    hover: u("photo-1611591437281-460bfbe1220a"),
    badge: "Exclusive",
    badgeTone: "gold"
  }];

  // Shop-by-category quick links
  const categories = [{
    label: "New In",
    img: u("photo-1469334031218-e382a71b716b")
  }, {
    label: "Clothing",
    img: u("photo-1487412720507-e7ab37603c6f")
  }, {
    label: "Dresses",
    img: u("photo-1572804013309-59a88b7e92f1")
  }, {
    label: "Bags",
    img: u("photo-1584917865442-de89df76afd3")
  }, {
    label: "Shoes",
    img: u("photo-1543163521-1bf539c55dd2")
  }, {
    label: "Jewellery",
    img: u("photo-1515562141207-7a88fb7ce338")
  }, {
    label: "Beauty",
    img: u("photo-1522335789203-aabd1fc54bc9")
  }, {
    label: "Sale",
    img: u("photo-1490481651871-ab68de25d43d")
  }];

  // Two-up editorial edits
  const edits = [{
    eyebrow: "The Edit",
    title: "Dresses for the season",
    copy: "From garden-party florals to occasion gowns.",
    cta: "Shop dresses",
    img: w("photo-1496747611176-843222e1e57c")
  }, {
    eyebrow: "The Edit",
    title: "Bags to covet",
    copy: "The arm-candy defining the new season.",
    cta: "Shop bags",
    img: w("photo-1566150905458-1bf1fc113f0d")
  }];

  // Top designers (text wordmarks)
  const designers = ["Saint Laurent", "Valentino", "Zimmermann", "Self-Portrait", "Chloé", "Balmain", "Aquazzura", "Jimmy Choo", "Elie Saab", "Bvlgari", "Leo Lin", "Dolce & Gabbana"];
  return {
    hero: w("photo-1490481651871-ab68de25d43d"),
    newIn,
    trending,
    categories,
    edits,
    designers
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/women-data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Tag = __ds_scope.Tag;

})();
