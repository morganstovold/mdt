import { MutableRefObject, useEffect, useRef } from 'react';

interface NuiMessageData<T = unknown> {
  method: string;
  data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

export const useNuiEvent = <T = any>(
  action: string,
  handler: (data: T) => void
) => {
  const savedHandler: MutableRefObject<NuiHandlerSignature<T> | null> = useRef(null);

  // When handler value changes, set mutable ref to handler value
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { method: eventAction, data } = event.data;

      if (savedHandler.current && typeof savedHandler.current === 'function') {
        if (eventAction === action) {
          savedHandler.current(data);
        }
      }
    };

    window.addEventListener('message', eventListener);

    // Remove Event Listener on component cleanup
    return () => {
      window.removeEventListener('message', eventListener);
    };
  }, [action]);
};
