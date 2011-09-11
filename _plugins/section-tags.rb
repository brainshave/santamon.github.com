module LSB
  class Section < Liquid::Tag
    include Liquid::StandardFilters

    @@level_of = {
      'section' => 2,
      'subsection' => 3,
      'subsubsection' => 4,
      'subsubsubsection' => 5
    }

    @@counters = [0,0,0,0,0,0]
    @@level = 1

    def self.level_of
      @@level_of
    end

    def initialize(tag_name, text, tokens)
      super
      @text = Liquid::Template.parse(text)
      @level = @@level_of[tag_name]
      if(@level > @@level)
        @@counters[@level] = 1
      else
        @@counters[@level] += 1
      end
      @number = @@counters[2..@level].join(".")

      @@level += 1
    end

    def render(context)
      @@level = 1
      <<-HTML
<div class="subsection_number h#{@level}">#{@number}</div>
<h#{@level}>#{@text.render}</h#{@level}>
HTML
    end
  end
end

LSB::Section.level_of.each do |key,_|
  Liquid::Template.register_tag(key, LSB::Section)
end
