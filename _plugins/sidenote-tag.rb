require 'rdiscount'

module LSB
  class Sidenote < Liquid::Block
    def render(context)
      text = RDiscount.new(super.join.strip, :smart)
      "<div class=\"didascalia\">#{text.to_html}</div>"
    end
  end
end

Liquid::Template.register_tag("sidenote", LSB::Sidenote)
