import React from 'react';
import { ListElementProps } from './ListElement';
export type ULElementProps = Omit<ListElementProps<'ul'>, 'listType'>;
export default function ULElement(props: ULElementProps): React.FunctionComponentElement<ListElementProps<"ol" | "ul">>;
