export function fmvarTransGenerator(
  type = "tween",
  direction = "right",
  duration = 0.4,
  value = "100px"
) {
  if (direction == "left") {
    return {
      offscreen: { x: value, opacity: 0 },
      onscreen: {
        x: 0,
        opacity: 1,
        transition: {
          type: type,
          duration: duration,
        },
      },
    };
  } else if (direction == "right") {
    return {
      offscreen: { x: `-${value}`, opacity: 0 },
      onscreen: {
        x: 0,
        opacity: 1,
        transition: {
          type: type,
          duration: duration,
        },
      },
    };
  } else if (direction == "below" || direction == "bottom") {
    return {
      offscreen: { y: value, opacity: 0 },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          duration: duration,
        },
      },
    };
  } else if (direction == "above" || direction == "top") {
    return {
      offscreen: { y: `-${value}`, opacity: 0 },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          duration: duration,
        },
      },
    };
  } else {
    return {
      offscreen: { x: `-${value}`, opacity: 0 },
      onscreen: {
        x: 0,
        opacity: 1,
        transition: {
          type: type,
          duration: duration,
        },
      },
    };
  }
}

/* =======================================================================
        SID
   ======================================================================= */
export function fmvarScaleGenerator(type = "tween", value = 1, duration = 0.4) {
  return {
    offscreen: { scale: 1, opacity: 1 },
    onscreen: {
      scale: value,
      opacity: 1,
      transition: {
        type: type,
        duration: duration,
      },
    },
  };
}

export function fmvarRotateGenerator(
  type = "tween",
  value = 1,
  duration = 0.4
) {
  return {
    offscreen: { rotate: 0, opacity: 1 },
    onscreen: {
      rotate: value,
      opacity: 1,
      transition: {
        type: type,
        duration: duration,
      },
    },
  };
}
