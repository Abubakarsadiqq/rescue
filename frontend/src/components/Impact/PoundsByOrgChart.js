import { Text } from '@sharingexcess/designsystem'
import { useIsMobile } from 'hooks'
import React from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'

export function PoundsByOrgChart({ poundsByOrg }) {
  const isMobile = useIsMobile()

  return (
    <section id="PoundsByOrgChart">
      <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
        <Treemap
          data={poundsByOrg}
          dataKey="weight"
          ratio={1 / 1}
          content={<TreemapContent />}
          isAnimationActive={false}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </section>
  )
}

const COLORS = [
  '#F8C12D',
  '#E2CF45',
  '#A5D297',
  '#8DC77B',
  '#9597E4',
  '#8889DD',
]

function TreemapContent({ depth, x, y, width, height, index, name }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: COLORS[index % 6],
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      <foreignObject x={x} y={y} height={height} width={width}>
        <p style={{ fontSize: Math.round(width * 0.1) }}>{name}</p>
      </foreignObject>
    </g>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="Impact-tooltip">
        <Text type="paragraph" align="center" color="green">
          {data.name}
        </Text>
        <Text type="small" align="center">
          {data.weight.toLocaleString()} lbs. rescued
        </Text>
      </div>
    )
  }

  return null
}
