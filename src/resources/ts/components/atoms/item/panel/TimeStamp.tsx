import React, { memo, VFC } from "react";
import styled from "styled-components";
import * as dayjs from "dayjs";

import { fonts } from "../../../../theme/setting/fonts";

type Props = {
  itemDate: string;
};

export const TimeStamp: VFC<Props> = memo((props) => {

  const {itemDate} = props;
  
  return(
    <SPanelTimeStamp>
    {dayjs(itemDate).format(
        "YYYY[年]M[月]D[日]"
    )}
</SPanelTimeStamp>

  );
});

const SPanelTimeStamp = styled.div`
    font-size: ${fonts.size.s};
`;
