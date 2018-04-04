import React from 'react'
import Route from '../src/route'
import Link from '../src/components/Link'
import renderer from 'react-test-renderer'

const view = new Route({
  path: '/profile/:username/:tab',
  component: <div/>,
})

function renderLinkToJson(props){
  return renderer.create(<Link {...props} />).toJSON()
}

test('Link renders', () => {
  const router = jest.fn()
  const tree = renderLinkToJson({ view, title: 'link', router, })
  expect(tree).toMatchSnapshot()
})

test('Link in new tab renders', () => {
  const router = jest.fn()
  const tree = renderLinkToJson({ view, title: 'link in new tab', router, shouldOpenInNewTab: true, })
  expect(tree).toMatchSnapshot()
})
