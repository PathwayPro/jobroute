import { Root, Trigger, Portal, Overlay, Content, Close } from '@radix-ui/react-dialog';
import React, { ForwardedRef } from 'react';

interface DialogProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

type Ref = ForwardedRef<HTMLDivElement>;
interface DialogContentProps {
  children: React.ReactNode;
  divRef?: React.RefObject<Ref>;
}

const DialogContent = React.forwardRef<Ref, DialogContentProps>((props, ref) => (
  <Content
    ref={ref as ForwardedRef<HTMLDivElement>}
    className="bg-white fixed min-w-[454px] max-w-[800px] max-h-[600px] z-30 overflow-hidden rounded-3xl border-2 border-dialog left-1/3 top-1/4"
  >
    <div className='flex p-[12px] justify-end'>
      <Close asChild>
        <button aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9.51305L2.34315 15.1699L0.457528 13.2843L6.11438 7.62743L0.457528 1.97057L2.34315 0.0849549L8 5.74181L13.6569 0.0849549L15.5425 1.97057L9.88562 7.62743L15.5425 13.2843L13.6569 15.1699L8 9.51305Z" fill="#42444D" />
          </svg>
        </button>
      </Close>
    </div>

    <div className='px-[40px] pb-[40px] h-[500px] scrollbar max-h-[calc(100% - 80px)] overflow-y-auto'>
      {props.children}
    </div>
  </Content>
));

DialogContent.displayName = 'DialogContent';


const Dialog = ({ children, trigger }: DialogProps) => {
  return (
    <Root>
      <Trigger asChild>
        {trigger}
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm" />
        <DialogContent>
          {children}
        </DialogContent>
      </Portal>
    </Root>
  );
};

export default Dialog;